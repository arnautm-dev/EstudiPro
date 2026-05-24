const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json());

app.use((req, res, next) => {
  if (
    req.path === '/data.json' ||
    req.path.startsWith('/server.js') ||
    req.path.startsWith('/package.json') ||
    req.path.startsWith('/package-lock.json') ||
    req.path.startsWith('/node_modules')
  ) {
    return res.status(404).end();
  }
  next();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.static(__dirname));

async function readData() {
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/api/questions', async (req, res) => {
  const data = await readData();
  res.json(data.questions);
});

app.post('/api/questions', async (req, res) => {
  const { title, content, author, category } = req.body;
  if (!title || !content || !category) {
    return res.status(400).json({ error: 'title, content and category are required' });
  }

  const data = await readData();
  const now = new Date().toISOString();
  const question = {
    id: Date.now().toString(),
    title: title.trim(),
    content: content.trim(),
    author: (author || 'Anònim').trim(),
    category,
    status: 'unsolved',
    createdAt: now,
    updatedAt: now
  };

  data.questions.push(question);
  await writeData(data);
  res.status(201).json(question);
});

app.put('/api/questions/:id/status', async (req, res) => {
  const { status } = req.body;
  if (!['solved', 'unsolved'].includes(status)) {
    return res.status(400).json({ error: 'invalid status' });
  }

  const data = await readData();
  const question = data.questions.find(q => q.id === req.params.id);
  if (!question) {
    return res.status(404).json({ error: 'question not found' });
  }

  question.status = status;
  question.updatedAt = new Date().toISOString();
  await writeData(data);
  res.json(question);
});

app.delete('/api/questions/:id', async (req, res) => {
  const data = await readData();
  const beforeCount = data.questions.length;
  data.questions = data.questions.filter(q => q.id !== req.params.id);
  data.answers = data.answers.filter(a => a.questionId !== req.params.id);

  if (data.questions.length === beforeCount) {
    return res.status(404).json({ error: 'question not found' });
  }

  await writeData(data);
  res.json({ success: true });
});

app.get('/api/answers', async (req, res) => {
  const data = await readData();
  res.json(data.answers);
});

app.get('/api/questions/:id/answers', async (req, res) => {
  const data = await readData();
  const answers = data.answers.filter(a => a.questionId === req.params.id);
  res.json(answers);
});

app.post('/api/questions/:id/answers', async (req, res) => {
  const { content, author } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'content is required' });
  }

  const data = await readData();
  const questionExists = data.questions.some(q => q.id === req.params.id);
  if (!questionExists) {
    return res.status(404).json({ error: 'question not found' });
  }

  const answer = {
    id: Date.now().toString(),
    questionId: req.params.id,
    content: content.trim(),
    author: (author || 'Anònim').trim(),
    createdAt: new Date().toISOString()
  };

  data.answers.push(answer);
  await writeData(data);
  res.status(201).json(answer);
});

app.delete('/api/answers/:id', async (req, res) => {
  const data = await readData();
  const beforeCount = data.answers.length;
  data.answers = data.answers.filter(a => a.id !== req.params.id);

  if (data.answers.length === beforeCount) {
    return res.status(404).json({ error: 'answer not found' });
  }

  await writeData(data);
  res.json({ success: true });
});

app.post('/api/reset', async (req, res) => {
  const emptyData = { questions: [], answers: [] };
  await writeData(emptyData);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Comunitat backend running at http://localhost:${PORT}`);
  console.log('Open http://localhost:' + PORT + '/comunitat.html');
});
