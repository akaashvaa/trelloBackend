import { responseHandler, SECRET_TOKEN } from '../../config.js'
import { User } from '../mongoose/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ErrorHandler } from '../utils/errorHandlerClass.js'
import { zSigninSchema, zSignupSchema } from '../utils/zodSchema.js'

import jwt from 'jsonwebtoken'

const signup = asyncHandler(async (req, res) => {
  const result = zSignupSchema.safeParse(req.body)
  // find user using userName is it is not exist then create new one
  let response = {}
  // zod validation
  if (!result.success) {
    console.log('zod validation failed')
    throw new ErrorHandler(411, 'zod validation', result.error)
  }

  const isUserExist = await User.findOne({ email: req.body.email })
  // if user exist
  if (isUserExist) {
    throw new ErrorHandler(411, 'user signup', 'username already taken')
  }
  // if not then create one
  const newUser = await User.create(req.body)

  const jwtToken = jwt.sign({ userId: newUser._id }, SECRET_TOKEN, {
    expiresIn: '7d',
  })
  res.cookie('token', jwtToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    domain: '.vercel.app',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  response = {
    type: 'signup',
    message: ' user signup  successfully',
  }
  return responseHandler(res, 201, response)
})

const signin = asyncHandler(async (req, res) => {
  const result = zSigninSchema.safeParse(req.body)
  let response = {}
  if (!result.success) {
    console.log('login input validation failed', result.error)
    response = {
      type: 'zod validation',
      message: result.error,
    }
    return responseHandler(res, 411, response)
  }

  const user = await User.findOne({ email: req.body.email })
  // if user doesn't exist
  if (!user) {
    response = {
      type: 'user login',
      message: "userName doesn't exist",
    }
    return responseHandler(res, 411, response)
  }
  // if password is wrong
  const isPasswordCorrect = await user.isPasswordCorrect(req.body.password)
  if (!isPasswordCorrect) {
    response = {
      type: 'usesr login',
      message: 'password is incorrect',
    }
    return responseHandler(res, 411, response)
  }
  const jwtToken = jwt.sign({ userId: user._id }, SECRET_TOKEN, {
    expiresIn: '7d',
  })
  res.cookie('token', jwtToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    domain: '.vercel.app',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  response = {
    type: 'signin',
    message: ' user signin successfully',
  }
  return responseHandler(res, 200, response)
})

const singout = asyncHandler(async (req, res) => {
  req.userId = null

  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    domain: '.vercel.app',
  })

  return responseHandler(res, 200, {
    type: 'sign out',
    message: 'signed out successfully',
  })
})

export { signup, signin, singout }
