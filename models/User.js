import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    trim: true,
    maxlength: [20, "Username cannot be more than 20 characters"]
  },
  firstName: {
    type: String,
    required: [true, "Please provide a first name"],
    trim: true,
    maxlength: [50, "First name cannot be more than 20 characters"]
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name"],
    trim: true,
    maxlength: [50, "Last name cannot be more than 20 characters"]
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    trim: true,
    maxlength: [50, "Email cannot be more than 50 characters"]
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password cannot be less than 6 characters"]
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: "dateCreated", updatedAt: false }
})

// Hash password before saving to database
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Compare password
UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

export default model("User", UserSchema)