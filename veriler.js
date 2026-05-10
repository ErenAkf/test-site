const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const filePath = path.join(process.cwd(), 'kullanici_verileri.txt');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(200).send('<h1>Kayıtlı Veriler</h1><p>Henüz veri yok.</p>');
      return;
    }
    res.status(200).send(`<h1>Kayıtlı Veriler</h1><pre>${data}</pre><a href="/">Ana Sayfa</a>`);
  });
}