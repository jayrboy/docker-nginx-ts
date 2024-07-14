import express, { Request, Response } from 'express'
import { Query } from 'express-serve-static-core'
import os from 'os'
import http from 'http'
import morgan from 'morgan'
import { User } from './models/user.type'

export interface TypedRequestQuery<T extends Query> extends Request {
  query: T
}

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req: Request, res: Response) => {
  res.status(200).type('text/html').send(`
    <h1> hostname:
      <code>${os.hostname()}</code>
    </h1>
  `)
})

app.get('/login', (req: TypedRequestQuery<User>, res: Response) => {
  res.status(200).type('application/json').json(req.query)
})

// Add 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).type('text/plain').send('Not found')
})

const port = process.env.PORT || 3000
http.createServer(app).listen(port, () => {
  console.log(`Server running at http://localhost:%s`, port)
})
