import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://daschayan8837:svd74food@shopper.zvng5.mongodb.net/shop').then(() => {
  console.log("connected");

})

// MongoDB Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

// Register User Endpoint
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful', user: user.name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch User Endpoint
app.post('/fetchuser', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user: user.name, role: user.role });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Chatbot Endpoint with Google Gemini API
const chatSessions = {};

app.post('/chat', async (req, res) => {
  console.log("hi")
  console.log(req.body.prompt);
  const sessionId = req.body.sessionId;  // Unique session ID for the user
  const message = req.body.message;
  if (!chatSessions[sessionId]) {
    chatSessions[sessionId] = [];
  }

  // Append user's message to the session chat history
  chatSessions[sessionId].push({ role: 'user', content: message });
console.log(chatSessions);


  try {
    const genAI = new GoogleGenerativeAI('AIzaSyCb8Lq4SbTBfHeBXHUmAj9Es73zeJdzVtw');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const latestUserMessage = chatSessions[sessionId].filter(msg => msg.role === 'user').pop()?.content || '';

    const contextForResponse = chatSessions[sessionId].map(msg => msg.content).join('\n');
    const prompt = `Here is a conversation context:\n${contextForResponse}\nRespond to the last message: "${latestUserMessage}"`
    
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    
    res.status(200).json({ reply: result.response.text() });
  } catch (error) {
    console.error('Error during chatbot request:', error);
    res.status(500).json({ error: 'Failed to generate content from Gemini API' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
