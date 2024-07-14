import express, { Request, Response } from 'express'
import morgan from 'morgan'
import os from 'os'
import http from 'http'

import product from './routes/product'
import auth from './routes/auth'

const app = express()

// Middleware setup
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Route handlers
app.get('/', (req: Request, res: Response) => {
  res.status(200).type('text/html').send(`
    <h1> hostname:
      <code>${os.hostname()}</code>
    </h1>
  `)
})

app.use('/api/product', product)

app.use('/api/auth', auth)

// Add 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).type('text/plain').send('Not found')
})

// Server setup
const port = process.env.PORT || 3000
http.createServer(app).listen(port, () => {
  console.log(`Server running at http://localhost:%s`, port)
})
