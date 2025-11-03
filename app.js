require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'supersecret';

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory DB
let users = [];
let events = [];
let userIdCounter = 1;
let eventIdCounter = 1;

// Helper Functions
const findUserByUsername = (username) => users.find(u => u.username === username);
const findEventsByUser = (userId) => events.filter(e => e.createdBy === userId);

// Auth Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (findUserByUsername(username)) return res.status(400).json({ error: 'User exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = { _id: userIdCounter++, username, password: hashed };
  users.push(user);
  res.status(201).json({ message: 'User created' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/api/events', authenticate, (req, res) => {
  res.json(findEventsByUser(req.user.id));
});

app.post('/api/events', authenticate, (req, res) => {
  const { title, date, reminder } = req.body;
  if (!title || !date) return res.status(400).json({ error: 'Title & date required' });
  const event = { _id: eventIdCounter++, title, date, reminder: reminder || 0, createdBy: req.user.id };
  events.push(event);
  res.status(201).json(event);
});




app.put('/api/events/:id', authenticate, (req, res) => {
  const index = events.findIndex(e => e._id === parseInt(req.params.id) && e.createdBy === req.user.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  const { title, date, reminder } = req.body;
  if (title) events[index].title = title;
  if (date) events[index].date = date;
  if (reminder !== undefined) events[index].reminder = reminder;
  res.json(events[index]);
});

app.delete('/api/events/:id', authenticate, (req, res) => {
  const index = events.findIndex(e => e._id === parseInt(req.params.id) && e.createdBy === req.user.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  events.splice(index, 1);
  res.status(204).send();
});

// Catch-all for frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Event Planner PRO running at http://localhost:${PORT}`);
});