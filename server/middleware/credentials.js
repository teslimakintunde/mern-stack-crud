const allowedOrigin = require("../config/allowedOrigin");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigin.includes(origin)) {
    return res.header("Access-Control-Allow-Credentials", true);
  }
};

module.exports = credentials;
