import { spawn } from 'child_process';
import path from 'path';

const vitePath = path.resolve('node_modules', 'vite', 'bin', 'vite.js');
const args = process.argv.slice(2);

const child = spawn('node', [vitePath, ...args], {
  stdio: 'inherit',
  shell: false
});

child.on('close', (code) => {
  process.exit(code);
});
