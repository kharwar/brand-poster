const { AccessDeniedError } = require("sequelize");
const { USER_ROLE } = require("../utils/user/constant");

module.exports = isAdmin = async (req, res, next) => {
  try {
    if (req.user.role != USER_ROLE.ADMIN) {
      throw new AccessDeniedError('ACCESS DENIED');
    }
    next();
  } catch (error) {
    return res.status(400).json({
      error,
      message: 'Bad Request'
    });
  }
};