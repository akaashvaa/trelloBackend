import { responseHandler } from '../../config.js'

const errorResponseHandler = (err, req, res, next) => {
  const status = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  const type = err.type

  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  responseHandler(res, status, { type: type, message })
}

export { errorResponseHandler }
