import { Router } from 'express'
const router = Router()


router.get('/', (req, res) => {
  res.json({ message: 'This is user route' })
})

export default router