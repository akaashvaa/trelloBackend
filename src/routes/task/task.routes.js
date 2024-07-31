import { Router } from 'express'
import {
  createTask,
  deleteTask,
  getAllTask,
  updateTask,
  updateTaskStatus,
} from '../../controller/task.controller.js'
import { authMiddleware } from '../../middlewares/middleware.js'
const taskRouter = Router()

taskRouter.get('/', authMiddleware, getAllTask)

taskRouter.post('/', authMiddleware, createTask)
taskRouter.delete('/:id', authMiddleware, deleteTask)
taskRouter.put('/:id', authMiddleware, updateTaskStatus)
taskRouter.put('/update/:id', authMiddleware, updateTask)

export { taskRouter }
