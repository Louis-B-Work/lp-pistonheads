// Tiny static server for the prototype: node serve.js [port]
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname, port = +process.argv[2] || 8765;
const types = {'.html':'text/html; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.css':'text/css','.js':'text/javascript','.md':'text/plain; charset=utf-8'};
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const f = path.normalize(path.join(root, p));
  if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, {'Content-Type': types[path.extname(f)] || 'application/octet-stream'});
    res.end(d);
  });
}).listen(port, () => console.log('http://localhost:' + port));
