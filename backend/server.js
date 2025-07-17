const express = require('express');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dispatch', (req, res) => {
  const {
    numbers, token, endpoint, externalKey,
    isClosed, messageType, messageText,
    imageUrl, intervalSeconds
  } = req.body;

  const jobId = uuidv4();
  const job = {
    id: jobId,
    numbers, token, endpoint, externalKey,
    isClosed, messageType, messageText,
    imageUrl, intervalSeconds,
    currentIndex: 0,
    logs: [],
    createdAt: new Date().toISOString()
  };

  setImmediate(() => sendNext(job));
  res.json({ jobId });
});

async function sendNext(job) {
  if (job.currentIndex >= job.numbers.length) return;

  const number = job.numbers[job.currentIndex];
  const url = job.messageType === 'text'
    ? job.endpoint
    : `${job.endpoint}/url`;

  const body = {
    number,
    externalKey: job.externalKey,
    isClosed: job.isClosed,
    body: job.messageText
  };
  if (job.messageType === 'image_text') {
    body.mediaUrl = job.imageUrl;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + job.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || data.message || `Status ${res.status}`);
    console.log("Enviado:", number);
  } catch (err) {
    console.error("Erro ao enviar para", number, "-", err.message);
  }

  job.currentIndex++;
  setTimeout(() => sendNext(job), job.intervalSeconds * 1000);
}

app.listen(3002, () => {
  console.log("Backend funcional rodando na porta 3000");
});