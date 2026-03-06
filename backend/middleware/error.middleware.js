const Error = {};
Error.handleAsyncError = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Error;
