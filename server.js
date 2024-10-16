import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import routes from './routes/index.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const startServer = async () => {
  try {
    // Connect to the database
    const mongoURI = process.env.MONGO_URI
    await mongoose.connect(mongoURI)
    console.log('Connected to the database...')

    // Use the imported routes
    app.use('/api', routes)

    app.use(express.static(path.join(__dirname, 'app/public')))

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}...`))
  } catch (e) {
    console.error('Error starting the server:', e)
  }
}

startServer()