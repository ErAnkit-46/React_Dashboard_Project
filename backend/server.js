const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
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

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).send('Email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, confirmPassword });
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found. Please register.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret_key');
     // Send the token along with the success message
     res.status(200).json({
      message: 'Login successful',
      token: token, // Include the token in the response
      user: user // Optionally include the user data if needed
    });
    
  } catch (err) {
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

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.confirmPassword = hashedNewPassword; // Updating confirmPassword as well
    await user.save();

    res.status(200).send('Password has been updated');
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).send('Error updating password');
  }
});

// API endpoint to send a message
app.post('/api/messages', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: 'Error saving message' });
  }
});

// API endpoint to get messages for a recipient
app.get('/api/messages/:recipientEmail', async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.params.recipientEmail }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching messages' });
  }
});


// Middleware to Protect Routes
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');
  try {
      const verified = jwt.verify(token, 'your_jwt_secret_key');
      req.user = verified;
      next();
  } catch (error) {
      res.status(400).send('Invalid Token');
  }
};

// Protected Route
app.get('/api/dash', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
