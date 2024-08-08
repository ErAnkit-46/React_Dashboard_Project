const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const db = process.env.MONGO_URI || 'mongodb+srv://akabhishek7294:fUkE9Dy0HjH7zxzW@login.ax6uvlr.mongodb.net/';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// API endpoint to register a new user
app.post('/api/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).send('Email or username already exists');
    }

    const newUser = new User({ username, email, password, confirmPassword });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Error registering user');
  }
});


// API endpoint to check if user exists and login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).send('User not found. Please register.');
    }

    // Check if the password is correct (assuming passwords are stored in plain text, which is not recommended for production)
    if (user.password !== password) {
      return res.status(400).send('Invalid password');
    }

    // Successful login
    res.status(200).send({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).send('Error logging in');
  }
});


// Start the server
app.listen(port, () => {
  console.log('Server running on port ${port}');
});