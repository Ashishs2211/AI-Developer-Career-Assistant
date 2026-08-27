/* =========================================
   GLOBAL ERROR HANDLER
========================================= */

const errorHandler = (
  err,
  req,
  res,
  next
) => {

  console.error(
    "========== GLOBAL ERROR =========="
  );

  console.error(
    "Message:",
    err.message
  );

  console.error(
    "Status:",
    err.status ||
      err.statusCode ||
      err.response?.status ||
      500
  );

  console.error(
    err.stack
  );

  console.error(
    "=================================="
  );


  /* ===============================
     STATUS CODE
  =============================== */

  let statusCode =
    err.status ||
    err.statusCode ||
    err.response?.status ||
    500;


  /* ===============================
     VALID STATUS CODE
  =============================== */

  if (
    statusCode < 400 ||
    statusCode > 599
  ) {
    statusCode = 500;
  }


  /* ===============================
     DEFAULT MESSAGE
  =============================== */

  let message =
    err.message ||
    "Something went wrong. Please try again.";


  /* ===============================
     MONGODB CAST ERROR
  =============================== */

  if (err.name === "CastError") {

    statusCode = 400;

    message =
      "Invalid request data.";

  }


  /* ===============================
     MONGODB DUPLICATE ERROR
  =============================== */

  if (err.code === 11000) {

    statusCode = 409;

    message =
      "This record already exists.";

  }


  /* ===============================
     JWT ERROR
  =============================== */

  if (err.name === "JsonWebTokenError") {

    statusCode = 401;

    message =
      "Invalid authentication token.";

  }


  /* ===============================
     JWT EXPIRED
  =============================== */

  if (err.name === "TokenExpiredError") {

    statusCode = 401;

    message =
      "Your session has expired. Please login again.";

  }


  /* ===============================
     SEND RESPONSE
  =============================== */

  return res
    .status(statusCode)
    .json({

      success: false,

      message,

    });
};


module.exports = errorHandler;