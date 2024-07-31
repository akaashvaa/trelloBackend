import { asyncHandler } from '../utils/asyncHandler.js'
import { Task } from '../mongoose/task.model.js'
import { ErrorHandler } from '../utils/errorHandlerClass.js'

import { responseHandler } from '../../config.js'
import { zTaskSchema } from '../utils/zodSchema.js'

const getAllTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).select('-user')

  // console.log({ tasks, userId })
  if (!tasks) throw new ErrorHandler(411, 'get all todo', 'user not found')
  const response = {
    type: 'get all todo',
    message: tasks,
  }
  return responseHandler(res, 200, response)
})

const createTask = asyncHandler(async (req, res) => {
  const result = zTaskSchema.safeParse(req.body)
  let response = {}
  console.log(req.body)
  if (!result.success) {
    console.log('invalid input on creating task', result.error)
    response = {
      type: 'zod validation',
      message: result.error,
    }
    return responseHandler(res, 411, response)
  }
  const taskData = {
    ...req.body,
    user: req.userId,
  }
  await Task.create(taskData)
  response = {
    type: 'create task',
    message: 'successfully created task',
  }
  return responseHandler(res, 201, response)
})

const updateTaskStatus = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  // console.log({ id, status })
  let response = {}
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
  if (!updatedTask) {
    response = {
      type: 'update task ',
      message: 'task not found',
    }
    return responseHandler(res, 404, response)
  }
  response = {
    type: 'update task',
    message: updatedTask,
  }
  return responseHandler(res, 200, response)
})

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params
  let response = {}
  const deletedTask = await Task.findByIdAndDelete(id)
  if (!deletedTask) {
    response = {
      type: 'delete task',
      message: 'task not found',
    }
    return responseHandler(res, 404, response)
  }
  response = {
    type: 'delete task',
    message: 'task successfully deleted',
  }
  return responseHandler(res, 200, response)
})

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params
  const result = zTaskSchema.safeParse(req.body)
  let response = {}
  if (!result.success) {
    console.log('invalid input on updating task', result.error)
    response = {
      type: 'zod validation',
      message: result.error,
    }
    return responseHandler(res, 411, response)
  }
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { ...req.body, user: req.userId },
    { new: true }
  )
  if (!updatedTask) {
    response = {
      type: 'update task',
      message: 'task not found',
    }
    return responseHandler(res, 404, response)
  }
  response = {
    type: 'update task',
    message: updatedTask,
  }
  return responseHandler(res, 200, response)
})
export { getAllTask, createTask, updateTaskStatus, deleteTask, updateTask }
