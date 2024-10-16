import { Router } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../../models/User.js"

const router = Router()

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Register user
router.post('/register', async (req, res) => {
  try {
    const { username, firstName, lastName, email, password, role } = req.body;
    const user = new User({ username, firstName, lastName, email, password, role })
    await user.save();
    res.status(201).json({ message: 'User registered successfully' })
  } catch (e) {
    console.error('Error registering user:', e)
    res.status(400).json({ error: e.message })
  }
})


// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email' })

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' })

    const token = generateToken({ _id: user._id, role: user.role })
    res.status(200).json({ token, role: user.role })
  } catch (e) {
    console.error('Error logging in user:', e)
    res.status(400).json({ error: e.message })
  }
})

// router.post('/logout', (req, res) => {
//   res.status(200).json({ message: 'User logged out successfully' })
// })

export default router