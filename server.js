const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/auth-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// const User = mongoose.model('User', UserSchema);
const User = require('./models/User')

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });

  try {
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
});

// app.post('/register', (req, res) => {
//   // Example logic to handle registration
//   const { username, email, password } = req.body;
//   try{
//     res.status(201).json({message: "sab kuch thuk h"})
//   }
//   catch(error){
//     res.sendStatus(400).json({error: 'kuch gadbahd hai'})
//   }
// })

// app.post('/login', (req, res) => {
//   // Example logic to handle registration
//   const {email, password } = req.body;
//   try{
//     res.status(201).json({message: "sab kuch thik h"})
//   }
//   catch(error){
//     res.sendStatus(400).json({error: 'kuch gadbahd hai'})
//   }
// })

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
    expiresIn: '1h',
  });

  res.json({ token });
});

app.get('/dashboard', async (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized1' });
  }

  try {
    const [bearer, token1] = token.split(' ')
    const decoded = jwt.verify(token1, 'your_jwt_secret');
    const user = await User.findById(decoded.userId);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized2' });
  }
});


