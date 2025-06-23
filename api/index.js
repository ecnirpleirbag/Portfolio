const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const POSTS_FILE = path.join(__dirname, 'posts.json');
const COMMENTS_FILE = path.join(__dirname, 'comments.json');
const ADMIN_PASSWORD = 'your_admin_password'; // Change this!

// Helper functions
function readJSON(file) {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Get all posts
app.get('/api/posts', (req, res) => {
  const posts = readJSON(POSTS_FILE);
  res.json(posts);
});

// Add a new post (admin only)
app.post('/api/posts', (req, res) => {
  const { title, content, password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const posts = readJSON(POSTS_FILE);
  const newPost = {
    id: Date.now().toString(),
    title,
    content,
    date: new Date().toISOString()
  };
  posts.unshift(newPost);
  writeJSON(POSTS_FILE, posts);
  res.json(newPost);
});

// Get comments for a post
app.get('/api/posts/:id/comments', (req, res) => {
  const comments = readJSON(COMMENTS_FILE);
  const postComments = comments.filter(c => c.postId === req.params.id);
  res.json(postComments);
});

// Add a comment to a post
app.post('/api/posts/:id/comments', (req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ error: 'Missing author or text' });
  }
  const comments = readJSON(COMMENTS_FILE);
  const newComment = {
    id: Date.now().toString(),
    postId: req.params.id,
    author,
    text,
    date: new Date().toISOString()
  };
  comments.push(newComment);
  writeJSON(COMMENTS_FILE, comments);
  res.json(newComment);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 