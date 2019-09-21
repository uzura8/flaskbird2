// For outout error log
function logErrors(err, req, res, next) {
  next(err)
}

// For rest api response
function clientErrorHandler(err, req, res, next) {
  res.status(err.output.statusCode).json(err.output.payload)
  //res.status(err.status || 500).json({
  //  message: err.message,
  //  error: err
  //})
}

// For normal response
function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  })
}

export {
  logErrors,
  clientErrorHandler,
  errorHandler,
}
