import Express, { Request, Response } from 'express'
import { Query } from 'express-serve-static-core'
import { User } from '../models/user.type'

export interface TypedRequestQuery<T extends Query> extends Request {
  query: T
}

const router = Express.Router()

// POST /api/auth/login
router.post('/login', (req: TypedRequestQuery<User>, res: Response) => {
  res.status(200).type('application/json').json(req.query)
})

export default router
