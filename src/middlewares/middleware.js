import { SECRET_TOKEN } from '../../config.js'
import jwt from 'jsonwebtoken'
import { ErrorHandler } from '../utils/errorHandlerClass.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const authMiddleware = asyncHandler((req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    throw new ErrorHandler(
      403,
      'cookie authorization',
      'Token is missing in cookies'
    )
  }

  const decode = jwt.verify(token, SECRET_TOKEN)
  req.userId = decode.userId
  console.log(req.userId)
  next()
})

export { authMiddleware }
