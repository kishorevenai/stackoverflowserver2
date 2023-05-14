const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader =
      req.headers["authorization"] || req.headers.Authorization;

    const token = authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401); //Unauthorised
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //Invalid Token
      req.body.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = auth;
