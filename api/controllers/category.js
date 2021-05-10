const { ForbiddenError } = require('@casl/ability');
const { Op } = require('sequelize');
const { Category, Image } = require('../../server/models');
const { CATEGORY_TYPE } = require('../utils/cateogry/constant');
const fs = require('fs');

module.exports = {
  createCategory: async (req, res) => {
    try {
      ForbiddenError.from(req.user.abilities).throwUnlessCan('create', 'Category');
      const category = await Category.create(req.body);
      return res.status(201).send(category);
    } catch (error) {
      return res.status(500).json({
        error,
        message: 'Unknown error'
      });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const category = await Category.findByPk(req.query.id);
      ForbiddenError.from(req.user.abilities).throwUnlessCan('update', category);
      await category.update({ ...req.body });
      return res.status(200).json({
        success: true,
        message: 'Category updated'
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
        message: 'Unknown error'
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByPk(req.query.id);
      ForbiddenError.from(req.user.abilities).throwUnlessCan('delete', category);
      const images = await Image.findAll({
        where: {
          categoryId: req.query.id
        },
        attributes: ['id', 'filename']
      });
      for (let { filename } of images) {
        fs.unlink(`./public/images/${filename}`, (err) => {
          if (err) throw err;
        });
      }
      await Category.destroy({
        where: {
          id: req.query.id
        }
      });
      return res.status(200).json({
        success: true,
        message: 'Category deleted'
      });
    } catch (error) {
      return res.status(500).json({
        error,
        message: 'Unknown error'
      });
    }
  },
  getCategory: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id, {
        include: [{
          model: Image,
          as: 'images'
        }]
      });
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({
        error,
        message: 'Unknown error'
      });
    }
  },
  getAllCategories: async (req, res) => {
    try {
      let categoryType;
      if (!req.query.type) {
        categoryType = {
          [Op.or]: [CATEGORY_TYPE.BUSINESS, CATEGORY_TYPE.FESTIVAL, CATEGORY_TYPE.MISC]
        };
      }
      else {
        categoryType = req.query.type;
      }
      const categories = await Category.findAll({
        where: {
          categoryType
        },
        include: [{
          model: Image,
          as: 'images'
        }]
      });
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({
        error,
        message: 'Unknown error'
      });
    }
  }
};