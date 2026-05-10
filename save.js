const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: 'İsim ve e-posta gerekli' });
    return;
  }

  const data = `kullanici: ${name}; ${email}\n`;
  const filePath = path.join(process.cwd(), 'kullanici_verileri.txt');

  fs.appendFile(filePath, data, (err) => {
    if (err) {
      console.error('Dosya yazma hatası:', err);
      res.status(500).json({ error: 'Veri kaydedilemedi' });
      return;
    }
    res.status(200).json({ message: 'Veri başarıyla kaydedildi' });
  });
}