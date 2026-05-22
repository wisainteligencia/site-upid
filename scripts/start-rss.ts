import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Iniciar o servidor RSS
const rssServer = spawn('npx', ['ts-node', join(__dirname, '../src/rss-server.ts')], {
  stdio: 'inherit',
  shell: true
});

rssServer.on('close', (code) => {
  console.log(`RSS Server exited with code ${code}`);
});

process.on('SIGINT', () => {
  rssServer.kill('SIGINT');
  process.exit();
});
