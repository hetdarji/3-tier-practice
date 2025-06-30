const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/messages');

const MessageSchema = new mongoose.Schema({
  text: String
});
const Message = mongoose.model('Message', MessageSchema);

app.get('/messages', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

app.post('/messages', async (req, res) => {
  const message = new Message({ text: req.body.text });
  await message.save();
  res.status(201).json(message);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
