import express from 'express'
var router = express.Router()

router.get('/', function (req, res, next) {
  return res.status(200).json({
    type: 'ok',
    message: 'everything works fine',
  })
})
router.get('/check-token', (req, res) => {
  const token = req.cookies.get('token')
  if (token) {
    return res.redirect(302, '/')
  } else {
    return res.redirect(302, '/signin')
  }
})

export default router
