const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const filePath = path.join('/tmp', 'kullanici_verileri.txt');
    
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: data
      };
    } else {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Henüz veri yok.'
      };
    }
  } catch (error) {
    console.error('Hata:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Veriler yüklenemedi' })
    };
  }
};