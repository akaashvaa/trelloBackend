import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: 30,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
})
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}
const User = model('User', userSchema)

export { User }
