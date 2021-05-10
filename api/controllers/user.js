const bcrypt = require('bcryptjs');
const { User, Business } = require('../../server/models');
const jwt = require('jsonwebtoken');
const { USER_ROLE } = require('../utils/user/constant');
const { AccessDeniedError } = require('sequelize');
const { ForbiddenError } = require('@casl/ability');
const { userCreate, userUpdate } = require('../middleware/schema');

module.exports = {
  register: async ({ body }, res) => {
    try {
      await userCreate.validateAsync(body);
      const hashedPassword = await bcrypt.hash(body.password, 10);
      delete body.password;
      body = { ...body, password: hashedPassword, role: USER_ROLE.USER };
      const user = await User.create(body);
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2d' });
      return res.status(201).send({ email: user.email, token });
    } catch (error) {
      return res.status(500).json({ error, message: 'Unknown Error' });
    }
  },
  updateUser: async (req, res) => {
    try {
      await userUpdate.validateAsync(req.body);
      const user = await User.findByPk(req.query.id);
      ForbiddenError.from(req.user.abilities).throwUnlessCan('update', user);
      delete req.body.password;
      delete req.body.role;
      await user.update({ ...req.body });
      return res.status(200).send({ success: true, message: "User Updated" });
    } catch (error) {
      return res.status(500).json({ error, message: 'Unknown Error' });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.query.id);
      ForbiddenError.from(req.user.abilities).throwUnlessCan('delete', user);
      await user.destroy();
      return res.status(200).send({ success: true, message: "User Deleted" });
    } catch (error) {
      return res.status(500).json({ error, message: 'Unknown Error' });
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { email: req.body.email }
      });
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2d' });
        return res.status(200).send({ token });
      }
      return res.status(400).json({
        message: "Incorrect Credentials",
      });
    } catch (error) {
      return res.status(500).json({ error, message: 'Unknown Error' });
    }
  },
  changePassword: async (req, res) => {
    try {
      const user = await User.findByPk(req.query.id, { attributes: ['id', 'password'] });
      ForbiddenError.from(req.user.abilities).throwUnlessCan('update', user);
      if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        await user.update({
          password: hashedPassword
        });
        return res.status(200).json({
          success: true,
          message: 'Password updated'
        });
      }
      throw new AccessDeniedError('Incorrect Old Password');
    } catch (error) {
      return res.status(500).json({ error, message: 'Unknown Error' });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id,
          role: USER_ROLE.USER
        },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'role']
        },
        include: [{
          model: Business,
          as: 'businesses',
          attributes: { exclude: ['userId'] }
        }]
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error, message: 'Unknown Error' });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        where: {
          role: USER_ROLE.USER
        },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'role']
        },
        include: [{
          model: Business,
          as: 'businesses',
          attributes: { exclude: ['userId'] }
        }]
      });
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error, message: 'Unknown Error' });
    }
  },
  current: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).json({ error, message: 'Unknown Error' });
    }
  }
};