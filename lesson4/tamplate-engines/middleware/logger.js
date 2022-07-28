function log  (req, res, next)  {
  console.log('Logging...');// request.body
  console.log('Authentication...');// request.body
  next()
}

module.exports = log;