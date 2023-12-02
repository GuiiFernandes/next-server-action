const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const secret = 'mysecretsshhh';

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'guifjj92@gmail.com' && password === '1234567') {
    const token = jwt.sign({ username }, secret);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Incorrect username or password' });
  }
});


const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).send('Unauthorized request');
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (error) {
    res.status(401).send('Unauthorized request');
  }
  next();
};

app.get('/protected', verifyToken, (_req, res) => {
  res.json({ message: `Protected router accessed successfully, your username: ${res.user}` });
});

const port = 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
