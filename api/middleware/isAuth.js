const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../../server/models");
const { defineAbilityFor } = require("../rules/abilities");
module.exports = isAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("No tokens!");
    }
    const decodedToken = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    let user = await User.findByPk(decodedToken.id, {
      attributes: ['id', 'role']
    });
    let abilities = defineAbilityFor(user);
    user = { ...user, abilities };
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error,
      message: "Bad Request"
    });
  }
};
