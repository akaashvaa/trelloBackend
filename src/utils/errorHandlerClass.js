class ErrorHandler extends Error {
  constructor(
    statusCode,
    type = 'Internal server',
    message = 'Something went wrong'
  ) {
    super(message)
    this.statusCode = statusCode
    this.type = type
    this.message = message

    Error.captureStackTrace(this, this.constructor)
  }
}

export { ErrorHandler }
