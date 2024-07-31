import { z } from 'zod'
const zSignupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(3, { message: 'password must be 3 or more characters long' }),
  fullName: z
    .string()
    .trim()
    .max(50, { message: 'firstName must be 50 or fewer characters long' }),
})
const zSigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const zTaskSchema = z.object({
  title: z.string().trim().min(1, { message: 'Title is required' }),
  description: z.string().trim().optional(),
  status: z.enum(['To do', 'In Progress', 'Under Review', 'Completed']),
  priority: z.enum(['Low', 'Medium', 'Urgent']).default('Medium'),
  deadline: z.string().trim().optional(),
})
export { zSignupSchema, zSigninSchema, zTaskSchema }
