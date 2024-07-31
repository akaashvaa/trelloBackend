import { responseHandler } from '../../config.js'

const errorResponseHandler = (err, req, res, next) => {
  const status = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  const type = err.type

  responseHandler(res, status, { type: type, message })
}

export { errorResponseHandler }
