// backend/src/server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000
const SERVICE_NAME = 'pc-builder-api'
const VERSION = '0.1.0' // matches backend/package.json

// Health endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: SERVICE_NAME,
    version: VERSION
  })
})

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Not Found',
    path: req.originalUrl
  })
})

// Centralized error handler (four-arg middleware)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.stack ? err.stack : err)
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

app.listen(PORT, () => {
  console.log(`${SERVICE_NAME} running on port ${PORT}`)
})
