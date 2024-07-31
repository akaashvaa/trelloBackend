//import User from "../mongoose/model.js"
import { Router } from 'express'

import { signin, signup, singout } from '../../controller/user.controller.js'

const userRouter = Router()

userRouter.post('/signup', signup)
userRouter.post('/signin', signin)
userRouter.post('/signout', singout)

export { userRouter }
