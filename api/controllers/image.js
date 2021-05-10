const multer = require("multer");
const fs = require('fs');
const { Image } = require('../../server/models');
const { ForbiddenError } = require("@casl/ability");

module.exports = {
  upload: async (req, res) => {
    try {
      ForbiddenError.from(req.user.abilities).throwUnlessCan('delete', 'image');
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, `./public/images`);
        },
        filename: (req, file, cb) => {
          cb(null, Date.now(Date.UTC) + file.originalname);
        }
      });
      let uploadFile = multer({
        storage: storage
      }).array('file', 10);
      uploadFile(req, res, async (err) => {
        if (err) {
          res.status(500).json({
            error: err,
            message: 'Could not upload images'
          });
        }

        for (let file of req.files) {
          const image = await Image.create({
            location: `http://${req.headers.host}/images/${file.filename}`,
            categoryId: req.body.categoryId,
            filename: file.filename
          });
        }
        return res.status(200).json({
          success: true,
          message: 'File uploaded'
        });
      });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error,
        message: 'Unknown Error'
      });
    }
  },
  delete: async (req, res) => {
    try {
      const image = await Image.findByPk(req.query.id);
      ForbiddenError.from(req.user.abilities).throwUnlessCan('delete', image);
      fs.unlinkSync(`./public/images/${image.filename}`);
      await image.destroy();
      return res.status(200).json({
        success: true,
        message: 'Image deleted'
      });
    } catch (error) {
      return res.status(500).json({
        error,
        message: 'Unknown Error'
      });
    }
  }
};