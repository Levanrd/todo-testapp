import { Router } from 'express'
import Task from '../../models/Task.js'
import authenticateToken from '../../middlewares/auth.js'
import authorizeAdmin from '../../middlewares/authorize.js'

const router = Router()

// GET /api/tasks - Retrieve all tasks
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dateCreated: -1 })
    res.status(200).json(tasks)
  } catch (e) {
    console.error('Error retrieving tasks:', e)
    res.status(400).json({ error: e.message })
  }
})

// GET /api/tasks/:id - Retrieve a single task by id
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    const task = await Task.findById(id)

    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.status(200).json(task)
  } catch (e) {
    console.error('Error retrieving task:', e)
    res.status(400).json({ error: e.message })
  }
})

// POST /api/tasks - Create a new task
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body

    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
      completed
    })

    const savedTask = await newTask.save()

    res.status(201).json(savedTask)
  } catch (e) {
    console.error('Error creating task:', e)
    res.status(400).json({ error: e.message })
  }
})

// PUT /api/tasks/:id - Update a task
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, priority, dueDate, completed } = req.body

    const updatedTask = await Task.findByIdAndUpdate(id,
      { title, description, priority, dueDate, completed },
      { new: true, runValidators: true }
    )

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.status(200).json(updatedTask)
  } catch (e) {
    console.error('Error updating task:', e)
    res.status(400).json({ error: e.message })
  }
})

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params

    const deletedTask = await Task.findByIdAndDelete(id)

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.status(200).json(deletedTask)
  } catch (e) {
    console.error('Error deleting task:', e)
    res.status(400).json({ error: e.message })
  }
})

export default router