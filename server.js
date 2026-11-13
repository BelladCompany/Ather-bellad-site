const http = require('http');
const fs = require('fs');
const path = require('path');

let PORT = parseInt(process.env.PORT, 10) || 3001;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(ROOT, reqPath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.on('error', (err) => {
  console.error('[SERVER-ERROR]', err);
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} in use, trying port ${PORT + 1}...`);
    PORT++;
    setTimeout(() => {
      server.listen(PORT, '0.0.0.0');
    }, 500);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[SERVER-ONLINE] Roadster 3D server listening on http://localhost:${PORT}/`);
});

// Keep event loop alive permanently
setInterval(() => {}, 10000);

process.on('SIGINT', () => {});
process.on('SIGTERM', () => {});
process.on('SIGHUP', () => {});

process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT-EXCEPTION]', err);
});

process.on('exit', (code) => {
  console.log('[PROCESS-EXIT] Exit code:', code);
});
