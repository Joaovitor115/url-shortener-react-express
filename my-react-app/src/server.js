import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';

const app = express();
const PORT = 5000;
const urlDatabase = {};

app.use(cors());
app.use(express.json());

// Shorten URL
app.post('/shorten', (req, res) => {
  const { originalUrl } = req.body;
  const id = nanoid(6);
  urlDatabase[id] = originalUrl;
  res.json({ shortUrl: `http://localhost:5000/${id}` });
});

// Redirect
app.get('/:id', (req, res) => {
  const originalUrl = urlDatabase[req.params.id];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
