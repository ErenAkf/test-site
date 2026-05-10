const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  console.log('Function called:', event.httpMethod);

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
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
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    console.log('Body:', event.body);
    const { name, email } = JSON.parse(event.body);

    if (!name || !email) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({ error: 'İsim ve e-posta gerekli' })
      };
    }

    const data = `kullanici: ${name}; ${email}\n`;
    const filePath = path.join('/tmp', 'kullanici_verileri.txt');

    fs.appendFileSync(filePath, data);
    console.log('Data saved:', data);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ message: 'Veri başarıyla kaydedildi' })
    };
  } catch (error) {
    console.error('Hata:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ error: 'Veri kaydedilemedi' })
    };
  }
};