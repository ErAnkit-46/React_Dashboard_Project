const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt'); // Import bcrypt

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const db = process.env.MONGO_URI || 'mongodb+srv://akabhishek7294:fUkE9Dy0HjH7zxzW@login.ax6uvlr.mongodb.net/';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, tls: true, tlsAllowInvalidCertificates: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // Removed confirmPassword from the schema
});

const User = mongoose.model('User', userSchema);

// Define Message Schema
const messageSchema = new mongoose.Schema({
  sender: String,
  recipient: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
  files: [String],
});

const Message = mongoose.model('Message', messageSchema);

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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new User({ username, email, password: hashedPassword });
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

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid password');
    }

    // Successful login
    res.status(200).send({ message: 'Login successful', user: { username: user.username, email: user.email } });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Error logging in');
  }
});

// API endpoint to reset password directly without current password validation
app.put('/api/reset-password', async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).send('New passwords do not match');
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user with the hashed password
    user.password = hashedPassword;
    await user.save();

    res.status(200).send('Password has been updated');
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).send('Error updating password');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
