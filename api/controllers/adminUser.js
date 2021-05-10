const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { User } = require('../../server/models');
const { USER_ROLE } = require("../utils/user/constant");
require('dotenv').config();

module.exports = {
  initialize: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const admin = await User.create({
        name: "Siddharth Kharwar",
        email: "ksiddharth127@gmail.com",
        password: hashedPassword,
        role: USER_ROLE.ADMIN
      });
      return res.status(201).json({
        success: true,
        message: `Admin User with email ${admin.email} created!`
      });
    } catch (error) {
      res.status(500).json({
        error,
        message: "UNKNOWN ERROR"
      });
    }
  },
  login: async (req, res) => {
    try {
      const admin = await User.findOne({
        where: {
          email: req.body.email,
          role: USER_ROLE.ADMIN
        }
      });
      if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
        const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '2d' });
        return res.status(200).json({
          success: true,
          message: "Logged in",
          token
        });
      }
      return res.status(401).json({
        success: false,
        message: "UNAUTHENTICATED"
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
        message: "UNKNOWN ERROR"
      });
    }
  },
  admin: async (req, res) => {
    try {
      const admin = await User.findOne({
        where: {
          id: req.user.id,
          role: USER_ROLE.ADMIN
        },
        attributes: { exclude: ['password'] }
      });
      return res.status(200).json(admin);
    } catch (error) {
      return res.status(500).json({
        error,
        message: "UNKNOWN ERROR"
      });
    }
  }
};