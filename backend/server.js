const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/disparar', async (req, res) => {
  const { number, messageText, mediaUrl, endpoint, token } = req.body;

  if (!number || !messageText || !endpoint || !token) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const body = {
    number,
    externalKey: "frontend",
    isClosed: false,
    body: messageText
  };

  if (mediaUrl) {
    body.mediaUrl = mediaUrl;
  }

  try {
    const response = await fetch(mediaUrl ? `${endpoint}/url` : endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});
