import Express, { Request, Response } from 'express'

const router = Express.Router()

// GET /api/product
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ id: 1, name: 'TypeScript', price: 2012 })
})

// GET /api/product/:id
router.get('/:id', (req: Request, res: Response) => {
  res.status(200).json({ id: req.params.id, name: 'TypeScript', price: 2012 })
})

// POST /api/product
router.post('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Create a product' })
})

// PUT /api/product/:id
router.put('/:id', (req: Request, res: Response) => {
  const productId = req.params.id
  res.status(200).json({ message: `Update product ${productId}` })
})

// DELETE /api/product/:id
router.delete('/:id', (req: Request, res: Response) => {
  const productId = req.params.id
  res.status(200).json({ message: `Delete product ${productId}` })
})

export default router
