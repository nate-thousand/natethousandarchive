require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const SIZE_MAP = {
  '1:1': '1024x1024',
  '16:9': '1792x1024',
  '9:16': '1024x1792',
};

function hasApiKey() {
  return Boolean(OPENAI_API_KEY && !OPENAI_API_KEY.includes('your-key'));
}

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'image-lab-api',
    hasKey: hasApiKey(),
  });
});

app.post('/api/generate', async (req, res) => {
  const prompt = (req.body?.prompt || '').trim();
  const aspect = req.body?.aspect_ratio || '1:1';

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt required' });
  }

  if (!hasApiKey()) {
    return res.status(500).json({
      error: 'Missing OPENAI_API_KEY',
      details: 'Copy .env.example to .env and add your OpenAI API key.',
    });
  }

  const size = SIZE_MAP[aspect] || SIZE_MAP['1:1'];

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size,
        quality: 'standard',
        response_format: 'url',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message =
        data?.error?.message ||
        data?.error?.code ||
        JSON.stringify(data);
      return res.status(response.status).json({
        error: 'OpenAI API error',
        details: message,
      });
    }

    const image = data?.data?.[0]?.url;
    const revisedPrompt = data?.data?.[0]?.revised_prompt;

    if (!image) {
      return res.status(500).json({
        error: 'No image returned',
        details: data,
      });
    }

    res.json({
      image,
      prompt,
      revised_prompt: revisedPrompt,
      size,
      id: `img_${Date.now()}`,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Request failed',
      details: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Image Lab API → http://localhost:${PORT}`);
  console.log(`  POST /api/generate  { prompt, aspect_ratio? }`);
  console.log(`  GET  /api/health`);
  if (!hasApiKey()) {
    console.warn('OPENAI_API_KEY is not set. Add it to .env before generating.');
  }
});
