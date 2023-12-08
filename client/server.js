const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

let activeTokens = [];

// Middleware to check if the request has a valid token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  if (activeTokens.includes(token)) {
    return next();
  }

  res.sendStatus(403);
};

app.use(express.json());

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    const token = 'test123';
    activeTokens.push(token);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});


app.listen(8088, () => console.log('API is running on http://localhost:8088/login'));