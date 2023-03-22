function log(req, res, next) {
  console.log('Logging...') 
  console.log('Authentication...') 
  next();
}

module.exports = log;