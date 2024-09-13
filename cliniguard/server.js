import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import { Type } from 'lucide-react';

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use (cors())

// MongoDB Connection
mongoose.connect('mongodb+srv://daschayan8837:svd74food@shopper.zvng5.mongodb.net/').then(()=>{
  console.log("connected");
  
})


const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role:String
});

const User = mongoose.model('User', userSchema);


app.post('/register', async (req, res) => {
  const { name, email, password,role } = req.body;

  try {
    const newUser = new User({ name, email, password,role });
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

    res.status(200).json({ message: 'Login successful ', user:user.name});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.post('/fetchuser',async(req,res)=>{
  const {email} =req.body;
  try{
    const user = await User.findOne({email})
    res.status(200).json({user:user.name,role:user.role});
    

  }catch{


  }


})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
