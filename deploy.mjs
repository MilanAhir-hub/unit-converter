import { execSync } from 'child_process';

try {
  console.log('🔨 Building site...');
  execSync('npx astro build', { stdio: 'inherit' });

  console.log('\n🚀 Deploying to Cloudflare Workers...');
  execSync('npx wrangler deploy --config dist/server/wrangler.json', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: '--dns-result-order=ipv4first' }
  });

  console.log('\n✅ Deployment complete!');
} catch (error) {
  console.error('\n❌ Deployment failed!');
  console.error('--------------------------------------------------');
  console.error('This error typically occurs due to one of the following:');
  console.error('1. The dev server ("npm run dev") is running in another terminal, locking files in the dist/ or node_modules/ folders.');
  console.error('   👉 FIX: Press Ctrl+C in your dev server terminal to stop it, then try again.');
  console.error('2. Windows file permission restrictions or a locked file.');
  console.error('   👉 FIX: Delete the "dist" directory manually and run the command again.');
  console.error('--------------------------------------------------\n');
  process.exit(1);
}
