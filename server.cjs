const express = require('express');
const cors = require('cors');
const redis = require('redis');

const app = express();
app.use(cors());
app.use(express.json());

const client = redis.createClient("192.168.1.48:6379"); // default: localhost:6379
client.connect(); // Redis v4+

app.post('/subsection', async (req, res) => {
  const { industry, region, subsection } = req.body;
  const cacheKey = `${industry}_${region}_${subsection}`;

  // 1. Check Redis
  const cached = await client.get(cacheKey);
  if (cached) {
    console.log('Cache hit');
    return res.json(JSON.parse(cached));
  }

  // 2. Simulate slow content generation
  console.log('Cache miss');
  const axios = require('axios');
  let generatedContent;
  try {
    const response = await axios.post('http://192.168.1.48:8008/subsection', {
      industry,
      region,
      subsection,
      n_words: 400,
    });
  
    generatedContent = response.data;
  } catch (err) {
    console.error('Failed to fetch from generator:', err);
    return res.status(500).json({ error: 'Failed to generate content' });
  }

  // 3. Save to Redis (expire in 10 minutes)
  await client.set(cacheKey, JSON.stringify(generatedContent), { EX: 600 });

  res.json(generatedContent);
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
