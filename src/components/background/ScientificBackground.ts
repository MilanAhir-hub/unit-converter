// ─── Scientific Background Engine ─────────────────────────────────────────────
// A lightweight Canvas 2D particle system with depth, connection lines,
// floating scientific symbols, mouse parallax, and dark/light theme support.
// Designed for 60fps on desktop, gracefully scaled on mobile.
// ──────────────────────────────────────────────────────────────────────────────

// ─── Types ───────────────────────────────────────────────────────────────────

interface ColorPalette {
  background: string;
  dot: string;
  dotHighlight: string;
  line: string;
  symbol: string;
}

interface Particle {
  x: number;
  y: number;
  z: number; // 0 (far) to 1 (near) — controls scale, opacity, speed
  vx: number;
  vy: number;
  baseRadius: number;
  isSymbol: boolean;
  symbolChar: string;
  rotation: number;
  rotationSpeed: number;
  isHighlighted: boolean;
}

interface EngineConfig {
  dotCount: number;
  symbolCount: number;
  showConnections: boolean;
  enableParallax: boolean;
  connectionMaxDist: number;
  maxConnectionsPerDot: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const DARK_PALETTE: ColorPalette = {
  background: '#050505',
  dot: 'rgba(255,255,255,0.45)',
  dotHighlight: 'rgba(59,130,246,0.70)',
  line: 'rgba(255,255,255,0.30)',
  symbol: 'rgba(255,255,255,0.22)',
};

const LIGHT_PALETTE: ColorPalette = {
  background: 'transparent',
  dot: 'rgba(0,0,0,0.35)',
  dotHighlight: 'rgba(37,99,235,0.55)',
  line: 'rgba(0,0,0,0.25)',
  symbol: 'rgba(0,0,0,0.18)',
};

const UNIT_SYMBOLS = [
  'm', 'kg', '°C', '°F', 'Hz', 'W', 'V', 'Ω', 'Pa',
  'MB', 'GB', 'km', 'mi', 'L', 'gal', 'mol', 'cd', 'A', 'N', 'J',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getDeviceConfig(): EngineConfig {
  const w = window.innerWidth;
  if (w >= 1024) {
    return {
      dotCount: 120,
      symbolCount: 10,
      showConnections: true,
      enableParallax: true,
      connectionMaxDist: 120,
      maxConnectionsPerDot: 3,
    };
  }
  if (w >= 768) {
    return {
      dotCount: 80,
      symbolCount: 7,
      showConnections: true,
      enableParallax: false,
      connectionMaxDist: 100,
      maxConnectionsPerDot: 2,
    };
  }
  return {
    dotCount: 45,
    symbolCount: 4,
    showConnections: false,
    enableParallax: false,
    connectionMaxDist: 0,
    maxConnectionsPerDot: 0,
  };
}

// ─── Spatial Grid ────────────────────────────────────────────────────────────
// Divides the canvas into cells for O(n) connection-line lookups.

class SpatialGrid {
  private cellSize: number;
  private cols: number;
  private rows: number;
  private cells: Map<number, number[]>;

  constructor(width: number, height: number, cellSize: number) {
    this.cellSize = cellSize;
    this.cols = Math.ceil(width / cellSize);
    this.rows = Math.ceil(height / cellSize);
    this.cells = new Map();
  }

  clear(): void {
    this.cells.clear();
  }

  getKey(col: number, row: number): number {
    return row * this.cols + col;
  }

  insert(index: number, x: number, y: number): void {
    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);
    const key = this.getKey(col, row);
    const bucket = this.cells.get(key);
    if (bucket) {
      bucket.push(index);
    } else {
      this.cells.set(key, [index]);
    }
  }

  getNeighbors(x: number, y: number): number[] {
    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);
    const result: number[] = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nc = col + dc;
        const nr = row + dr;
        if (nc < 0 || nr < 0 || nc >= this.cols || nr >= this.rows) continue;
        const bucket = this.cells.get(this.getKey(nc, nr));
        if (bucket) {
          for (let i = 0; i < bucket.length; i++) {
            result.push(bucket[i]);
          }
        }
      }
    }
    return result;
  }

  resize(width: number, height: number): void {
    this.cols = Math.ceil(width / this.cellSize);
    this.rows = Math.ceil(height / this.cellSize);
  }
}

// ─── Engine ──────────────────────────────────────────────────────────────────

export class ScientificBackgroundEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private config: EngineConfig;
  private palette: ColorPalette;
  private targetPalette: ColorPalette;
  private grid: SpatialGrid;
  private animId: number = 0;
  private isRunning: boolean = false;
  private reducedMotion: boolean = false;
  private themeObserver: MutationObserver | null = null;

  // Mouse parallax
  private mouseX: number = 0;
  private mouseY: number = 0;
  private parallaxX: number = 0;
  private parallaxY: number = 0;

  // Canvas dimensions (CSS pixels)
  private width: number = 0;
  private height: number = 0;
  private dpr: number = 1;

  // Resize debounce
  private resizeTimer: number = 0;

  // Theme transition
  private transitionProgress: number = 1; // 1 = complete
  private currentBgColor: string = '';

  // Interpolated RGBA values for smooth transitions
  private currentDotRGBA: [number, number, number, number] = [0, 0, 0, 0];
  private targetDotRGBA: [number, number, number, number] = [0, 0, 0, 0];
  private currentHighlightRGBA: [number, number, number, number] = [0, 0, 0, 0];
  private targetHighlightRGBA: [number, number, number, number] = [0, 0, 0, 0];
  private currentLineRGBA: [number, number, number, number] = [0, 0, 0, 0];
  private targetLineRGBA: [number, number, number, number] = [0, 0, 0, 0];
  private currentSymbolRGBA: [number, number, number, number] = [0, 0, 0, 0];
  private targetSymbolRGBA: [number, number, number, number] = [0, 0, 0, 0];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('Canvas 2D context unavailable');
    this.ctx = ctx;

    this.config = getDeviceConfig();
    this.palette = this.isDark() ? DARK_PALETTE : LIGHT_PALETTE;
    this.targetPalette = this.palette;
    this.grid = new SpatialGrid(window.innerWidth, window.innerHeight, 130);

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.initRGBA();
  }

  // ─── Lifecycle ───────────────────────────────────────────────────────────

  init(): void {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.observeTheme();

    if (this.reducedMotion) {
      // Render one static frame
      this.drawFrame();
    } else {
      this.start();
    }
  }

  destroy(): void {
    this.stop();
    this.unbindEvents();
    this.themeObserver?.disconnect();
  }

  private start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.tick();
  }

  private stop(): void {
    this.isRunning = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = 0;
    }
  }

  // ─── Event Binding ───────────────────────────────────────────────────────

  private onResize = (): void => {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => {
      const newConfig = getDeviceConfig();
      const countsChanged =
        newConfig.dotCount !== this.config.dotCount ||
        newConfig.symbolCount !== this.config.symbolCount;
      this.config = newConfig;
      this.resize();
      if (countsChanged) {
        this.createParticles();
      }
      if (this.reducedMotion) {
        this.drawFrame();
      }
    }, 250) as unknown as number;
  };

  private onMouseMove = (e: MouseEvent): void => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  private onVisibilityChange = (): void => {
    if (document.hidden) {
      this.stop();
    } else if (!this.reducedMotion) {
      this.start();
    }
  };

  private bindEvents(): void {
    window.addEventListener('resize', this.onResize, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    if (this.config.enableParallax) {
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    }
  }

  private unbindEvents(): void {
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  // ─── Theme Observation ───────────────────────────────────────────────────

  private isDark(): boolean {
    return document.documentElement.classList.contains('dark');
  }

  private observeTheme(): void {
    this.themeObserver = new MutationObserver(() => {
      const newPalette = this.isDark() ? DARK_PALETTE : LIGHT_PALETTE;
      if (newPalette !== this.palette) {
        this.targetPalette = newPalette;
        this.targetDotRGBA = this.parseRGBA(newPalette.dot);
        this.targetHighlightRGBA = this.parseRGBA(newPalette.dotHighlight);
        this.targetLineRGBA = this.parseRGBA(newPalette.line);
        this.targetSymbolRGBA = this.parseRGBA(newPalette.symbol);
        this.transitionProgress = 0;
      }
    });
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  // ─── RGBA Helpers ────────────────────────────────────────────────────────

  private parseRGBA(rgba: string): [number, number, number, number] {
    // Parse rgba(r,g,b,a) or transparent
    if (rgba === 'transparent') return [0, 0, 0, 0];
    const m = rgba.match(/[\d.]+/g);
    if (!m || m.length < 4) return [0, 0, 0, 0];
    return [
      parseFloat(m[0]),
      parseFloat(m[1]),
      parseFloat(m[2]),
      parseFloat(m[3]),
    ];
  }

  private lerpRGBA(
    a: [number, number, number, number],
    b: [number, number, number, number],
    t: number
  ): [number, number, number, number] {
    return [
      lerp(a[0], b[0], t),
      lerp(a[1], b[1], t),
      lerp(a[2], b[2], t),
      lerp(a[3], b[3], t),
    ];
  }

  private rgbaString(c: [number, number, number, number], alphaScale: number = 1): string {
    return `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${(c[3] * alphaScale).toFixed(4)})`;
  }

  private initRGBA(): void {
    this.currentDotRGBA = this.parseRGBA(this.palette.dot);
    this.targetDotRGBA = this.currentDotRGBA;
    this.currentHighlightRGBA = this.parseRGBA(this.palette.dotHighlight);
    this.targetHighlightRGBA = this.currentHighlightRGBA;
    this.currentLineRGBA = this.parseRGBA(this.palette.line);
    this.targetLineRGBA = this.currentLineRGBA;
    this.currentSymbolRGBA = this.parseRGBA(this.palette.symbol);
    this.targetSymbolRGBA = this.currentSymbolRGBA;
    this.currentBgColor = this.palette.background;
  }

  // ─── Canvas Setup ────────────────────────────────────────────────────────

  private resize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.grid.resize(this.width, this.height);
  }

  // ─── Particle Creation ───────────────────────────────────────────────────

  private createParticles(): void {
    this.particles = [];
    const total = this.config.dotCount + this.config.symbolCount;

    for (let i = 0; i < total; i++) {
      const isSymbol = i >= this.config.dotCount;
      const z = randomRange(0.15, 1);
      const speedScale = 0.3 + z * 0.5; // far = slower, near = faster

      this.particles.push({
        x: randomRange(0, this.width),
        y: randomRange(0, this.height),
        z,
        vx: randomRange(-0.4, 0.4) * speedScale,
        vy: randomRange(-0.4, 0.4) * speedScale,
        baseRadius: isSymbol ? 0 : randomRange(1, 2.2),
        isSymbol,
        symbolChar: isSymbol
          ? UNIT_SYMBOLS[Math.floor(Math.random() * UNIT_SYMBOLS.length)]
          : '',
        rotation: randomRange(0, Math.PI * 2),
        rotationSpeed: isSymbol ? randomRange(-0.001, 0.001) : 0,
        isHighlighted: !isSymbol && Math.random() < 0.12,
      });
    }
  }

  // ─── Main Loop ───────────────────────────────────────────────────────────

  private tick = (): void => {
    if (!this.isRunning) return;
    this.update();
    this.drawFrame();
    this.animId = requestAnimationFrame(this.tick);
  };

  private update(): void {
    // Theme transition
    if (this.transitionProgress < 1) {
      this.transitionProgress = Math.min(this.transitionProgress + 0.025, 1);
      const t = this.transitionProgress;
      this.currentDotRGBA = this.lerpRGBA(this.currentDotRGBA, this.targetDotRGBA, t * 0.08);
      this.currentHighlightRGBA = this.lerpRGBA(this.currentHighlightRGBA, this.targetHighlightRGBA, t * 0.08);
      this.currentLineRGBA = this.lerpRGBA(this.currentLineRGBA, this.targetLineRGBA, t * 0.08);
      this.currentSymbolRGBA = this.lerpRGBA(this.currentSymbolRGBA, this.targetSymbolRGBA, t * 0.08);

      if (this.transitionProgress >= 1) {
        this.palette = this.targetPalette;
        this.currentDotRGBA = this.targetDotRGBA;
        this.currentHighlightRGBA = this.targetHighlightRGBA;
        this.currentLineRGBA = this.targetLineRGBA;
        this.currentSymbolRGBA = this.targetSymbolRGBA;
        this.currentBgColor = this.palette.background;
      }
    }

    // Mouse parallax
    if (this.config.enableParallax) {
      const targetPX = (this.mouseX - this.width / 2) * 0.008;
      const targetPY = (this.mouseY - this.height / 2) * 0.008;
      this.parallaxX = lerp(this.parallaxX, targetPX, 0.05);
      this.parallaxY = lerp(this.parallaxY, targetPY, 0.05);
    }

    // Move particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      // Wrap around edges with buffer
      const buf = 30;
      if (p.x < -buf) p.x = this.width + buf;
      if (p.x > this.width + buf) p.x = -buf;
      if (p.y < -buf) p.y = this.height + buf;
      if (p.y > this.height + buf) p.y = -buf;
    }
  }

  // ─── Drawing ─────────────────────────────────────────────────────────────

  private drawFrame(): void {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Background fill (only in dark mode — in light mode we're transparent)
    const bgColor = this.transitionProgress < 1
      ? (this.targetPalette === DARK_PALETTE ? DARK_PALETTE.background : 'transparent')
      : this.currentBgColor;

    if (bgColor && bgColor !== 'transparent') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);
    }

    // Build spatial grid for connections
    if (this.config.showConnections) {
      this.grid.clear();
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        if (!p.isSymbol) {
          this.grid.insert(i, p.x, p.y);
        }
      }
      this.drawConnections(ctx);
    }

    // Draw particles
    this.drawParticles(ctx);
  }

  private drawConnections(ctx: CanvasRenderingContext2D): void {
    const maxDist = this.config.connectionMaxDist;
    const maxConn = this.config.maxConnectionsPerDot;
    const maxDistSq = maxDist * maxDist;
    const drawn = new Set<string>();

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (p.isSymbol) continue;

      const px = p.x + this.parallaxX * p.z;
      const py = p.y + this.parallaxY * p.z;
      const neighbors = this.grid.getNeighbors(p.x, p.y);
      let connCount = 0;

      for (let n = 0; n < neighbors.length && connCount < maxConn; n++) {
        const j = neighbors[n];
        if (j <= i) continue; // avoid duplicates

        const q = this.particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const distSq = dx * dx + dy * dy;

        if (distSq > maxDistSq) continue;

        const key = `${i}-${j}`;
        if (drawn.has(key)) continue;
        drawn.add(key);

        const dist = Math.sqrt(distSq);
        const alphaScale = (1 - dist / maxDist) * Math.min(p.z, q.z);

        const qx = q.x + this.parallaxX * q.z;
        const qy = q.y + this.parallaxY * q.z;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(qx, qy);
        ctx.strokeStyle = this.rgbaString(this.currentLineRGBA, alphaScale);
        ctx.lineWidth = 0.5;
        ctx.stroke();

        connCount++;
      }
    }
  }

  private drawParticles(ctx: CanvasRenderingContext2D): void {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const px = p.x + this.parallaxX * p.z;
      const py = p.y + this.parallaxY * p.z;

      if (p.isSymbol) {
        this.drawSymbol(ctx, p, px, py);
      } else {
        this.drawDot(ctx, p, px, py);
      }
    }
  }

  private drawDot(
    ctx: CanvasRenderingContext2D,
    p: Particle,
    px: number,
    py: number
  ): void {
    const scale = 0.4 + p.z * 0.6;
    const r = p.baseRadius * scale;
    const rgba = p.isHighlighted ? this.currentHighlightRGBA : this.currentDotRGBA;
    const alphaScale = 0.3 + p.z * 0.7;

    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = this.rgbaString(rgba, alphaScale);
    ctx.fill();
  }

  private drawSymbol(
    ctx: CanvasRenderingContext2D,
    p: Particle,
    px: number,
    py: number
  ): void {
    const scale = 0.5 + p.z * 0.5;
    const fontSize = (10 + p.z * 4) * scale;
    const alphaScale = 0.3 + p.z * 0.7;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(p.rotation);
    ctx.font = `${fontSize}px "Inter Variable", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.rgbaString(this.currentSymbolRGBA, alphaScale);
    ctx.fillText(p.symbolChar, 0, 0);
    ctx.restore();
  }
}

// ─── Auto-init ───────────────────────────────────────────────────────────────

function boot(): void {
  const canvas = document.getElementById('sci-bg') as HTMLCanvasElement | null;
  if (!canvas) return;

  const engine = new ScientificBackgroundEngine(canvas);
  engine.init();

  // Cleanup on page navigation (Astro View Transitions)
  document.addEventListener('astro:before-swap', () => {
    engine.destroy();
  });
}

// Support both initial load and Astro page transitions
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

document.addEventListener('astro:page-load', boot);
