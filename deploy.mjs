import { execSync } from 'child_process';

console.log('🔨 Building site...');
execSync('npx astro build', { stdio: 'inherit' });

console.log('\n🚀 Deploying to Cloudflare Workers...');
execSync('npx wrangler deploy', { stdio: 'inherit' });

console.log('\n✅ Deployment complete!');
