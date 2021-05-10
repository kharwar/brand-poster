const { ForbiddenError } = require('@casl/ability');
const { Business } = require('../../server/models');

module.exports = {
  createBusiness: async ({ body, user }, res) => {
    try {
      await Business.create({ ...body, userId: user.id }, {
        attributes: { exclude: ['userId'] }
      });
      return res.status(201).json({
        success: true,
        message: 'Business created.'
      });
    } catch (error) {
      return res.status(500).json({ error, message: 'Unknown Error' });
    }
  },
  updateBusiness: async (req, res) => {
    try {
      const business = await Business.findOne({
        where: {
          id: req.query.id
        }
      });
      ForbiddenError.from(req.user.abilities).throwUnlessCan('update', business);
      business.update(req.body);
      return res.status(200).json({
        success: true,
        message: 'Business updated.'
      });
    } catch (error) {
      return res.status(500).json({ error, message: 'Unknown Error' });
    }
  },
  deleteBusiness: async (req, res) => {
    try {
      const business = await Business.findByPk(req.query.id);
      ForbiddenError.from(req.user.abilities).throwUnlessCan('delete', business);
      business.destroy();
      return res.status(200).json({
        success: true,
        message: 'Business deleted.'
      });
    } catch (error) {
      return res.status(500).json({ error, message: 'Unknown Error' });
    }
  },
  getBusiness: async (req, res) => {
    try {
      const business = await Business.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id
        }
      });
      return res.status(200).json(business);
    } catch (error) {
      return res.status(500).json({ error, message: 'Unknown Error' });
    }
  },
  getMyBusinesses: async (req, res) => {
    try {
      const businesses = await Business.findAll({
        where: {
          userId: req.user.id
        }
      });
      return res.status(200).json(businesses);
    } catch (error) {
      return res.status(500).json({ error, message: 'Unknown Error' });
    }
  }
};