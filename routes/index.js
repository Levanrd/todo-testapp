import { Router } from 'express'
import tasksRouter from './tasks/tasks.js'
import authRouter from './auth/auth.js'

// import usersRouter from './users/users.js' 

const router = Router()

router.use('/auth', authRouter)
router.use('/tasks', tasksRouter)
// router.use('/users', usersRouter)

export default router