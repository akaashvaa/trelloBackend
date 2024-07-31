import mongoose from 'mongoose'
import createError from 'http-errors'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'
dotenv.config()
import indexRouter from './routes/index.js'
import { userRouter } from './routes/user/user.routes.js'
import { taskRouter } from './routes/task/task.routes.js'
import { errorResponseHandler } from './utils/errorResponseHandler.js'

var app = express()

app.use(
  cors({
    origin: 'https://trello-client-r7bt.vercel.app',
    credentials: true,
  })
)
app.use(cookieParser())

app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use('/api/v1', indexRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/task', taskRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(errorResponseHandler)

const PORT = process.env.PORT || 8000
const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log('mongo db connected ')
    app.listen(PORT, function () {
      console.log('app is listening to port ' + PORT)
    })
  })
  .catch((error) => console.log("can't start the app", error.message))
export default app
