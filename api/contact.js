import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  message: { type: String, required: true, trim: true, maxlength: 3000 },
}, { timestamps: true })

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)
const cached = globalThis.__riyaMongoConnection || { connection: null, promise: null }
globalThis.__riyaMongoConnection = cached

async function connectToDatabase() {
  if (cached.connection) return cached.connection
  if (!process.env.MONGODB_URI) throw new Error('Database is not configured.')
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 5,
    }).then(connection => connection).catch(error => {
      cached.promise = null
      throw error
    })
  }
  cached.connection = await cached.promise
  return cached.connection
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ message: 'Please send valid form details.' }, { status: 400 })
  }

  const { name, email, message } = body || {}
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' || !name.trim() || !email.trim() || !message.trim()) {
    return Response.json({ message: 'Please provide your name, email, and message.' }, { status: 400 })
  }
  if (name.length > 100 || email.length > 254 || message.length > 3000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return Response.json({ message: 'Please check your details and try again.' }, { status: 400 })
  }

  try {
    await connectToDatabase()
    await Message.create({ name, email, message })
    return Response.json({ message: 'Your message was received.' }, { status: 201 })
  } catch (error) {
    console.error('Unable to store contact message:', error.message)
    return Response.json({ message: 'Messages are temporarily unavailable. Please try again later.' }, { status: 503 })
  }
}
