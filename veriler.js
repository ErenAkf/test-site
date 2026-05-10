const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  console.log('Veriler function called:', event.httpMethod);

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: ''
    };
  }

  try {
    const filePath = path.join('/tmp', 'kullanici_verileri.txt');

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      console.log('Data read:', data);
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain'
        },
        body: data
      };
    } else {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain'
        },
        body: 'Henüz veri yok.'
      };
    }
  } catch (error) {
    console.error('Hata:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
      },
      body: 'Veriler yüklenemedi.'
    };
  }
};