const joi = require('@hapi/joi');

const userCreate = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().email().trim().required(),
  password: joi.string().min(6).max(30).required(),
  phoneNo: joi.number().min(10).max(10).required()
});

const userUpdate = joi.object({
  name: joi.string().trim(),
  email: joi.string().email().trim(),
  phoneNo: joi.number().min(10).max(10),
});

module.exports = {
  userCreate,
  userUpdate
};