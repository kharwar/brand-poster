const { CATEGORY_TYPE } = require("../../api/utils/cateogry/constant");

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryType: {
      type: DataTypes.ENUM(CATEGORY_TYPE.BUSINESS, CATEGORY_TYPE.FESTIVAL, CATEGORY_TYPE.MISC),
      default: CATEGORY_TYPE.MISC,
    },
    scheduleOn: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  });

  Category.associate = (models) => {
    Category.hasMany(models.Image, {
      foreignKey: 'categoryId',
      targetKey: 'id',
      as: 'images',
      onDelete: 'CASCADE'
    });
  };
  return Category;
};
