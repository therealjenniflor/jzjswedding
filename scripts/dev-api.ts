import http from 'http';
import { URL } from 'url';
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env') });

// Import handlers after env is loaded
const { default: guestHandler } = await import('../api/guest.js');
const { default: rsvpHandler } = await import('../api/rsvp.js');

const routes: Record<string, Function> = {
  '/api/guest': guestHandler,
  '/api/rsvp': rsvpHandler,
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url!, 'http://localhost');
  const handler = routes[url.pathname];

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200); res.end(); return;
  }

  if (!handler) {
    res.writeHead(404); res.end('Not found'); return;
  }

  // Polyfill Vercel response helpers
  const vRes = res as any;
  vRes.status = (code: number) => { res.statusCode = code; return vRes; };
  vRes.json = (data: unknown) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
    return vRes;
  };

  (req as any).query = Object.fromEntries(url.searchParams);

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { (req as any).body = JSON.parse(body); } catch { (req as any).body = {}; }
      handler(req, res);
    });
  } else {
    handler(req, res);
  }
});

server.listen(3001, () => {
  console.log('API dev server running at http://localhost:3001');
});
