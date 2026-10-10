import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '12kb' }))

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  message: { type: String, required: true, trim: true, maxlength: 3000 },
}, { timestamps: true })
const Message = mongoose.model('Message', messageSchema)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {}
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' || !name.trim() || !email.trim() || !message.trim()) {
    return res.status(400).json({ message: 'Please provide your name, email, and message.' })
  }
  if (name.length > 100 || email.length > 254 || message.length > 3000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ message: 'Please check your details and try again.' })
  }
  try {
    await Message.create({ name, email, message })
    res.status(201).json({ message: 'Your message was received.' })
  } catch (error) {
    console.error('Unable to store contact message:', error.message)
    res.status(503).json({ message: 'Messages are temporarily unavailable. Please try again later.' })
  }
})

const port = Number(process.env.PORT || 3001)
if (!process.env.MONGODB_URI) console.warn('MONGODB_URI is not set; contact submissions will be unavailable.')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/riya_portfolio')
  .then(() => app.listen(port, () => console.log(`Contact API listening on http://localhost:${port}`)))
  .catch(error => { console.error('MongoDB connection failed:', error.message); process.exit(1) })
