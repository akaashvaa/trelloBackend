import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: 'No description found !',
    },
    status: {
      type: String,
      required: true,
      enum: ['To do', 'In Progress', 'Under Review', 'Completed'],
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'Urgent'],
      default: 'Medium',
    },
    deadline: {
      type: String,
    },
  },
  { timestamps: true }
)

taskSchema.pre('save', function (next) {
  if (this.description === '') {
    this.description = 'No description found !'
  }
  next()
})

const Task = mongoose.model('Task', taskSchema)

export { Task }
