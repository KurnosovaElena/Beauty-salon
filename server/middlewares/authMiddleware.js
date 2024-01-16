const { response } = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'super-secret-key'

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        message: "Auth failed. Token is missing.",
        success: false,
      });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Auth failed. Invalid token.",
          success: false,
        });
      } else {
          req.body._id = decoded.id;
          next();
      }
    });
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
