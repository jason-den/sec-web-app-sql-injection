const errorHandler = (err, req, res, next) => {
  if (err && err.httpCode)
    return res.status(err.httpCode).json({
      message: err.message,
    });
  else {
    console.log("catch error \n\n\n\n");
    console.log(err);
    return res.status(500).send(err.message);
  }
};

module.exports = errorHandler;
