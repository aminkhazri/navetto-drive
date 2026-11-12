// node serve.mjs: serves dist/ on :5190 and records POST /signup in signups.log (a stand-in for the Apps Script).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' };
http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/signup') {
    let body = ''; req.on('data', (c) => (body += c));
    req.on('end', () => { fs.appendFileSync('signups.log', body + '\n'); res.writeHead(302, { Location: '/' }); res.end(); });
    return;
  }
  let file = path.join(dist, decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404); return res.end('not found'); }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(5190, () => console.log('http://localhost:5190'));
