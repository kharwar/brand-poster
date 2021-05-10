module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("Image", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    filename: {
      type: DataTypes.STRING
    }
  });

  Image.associate = (models) => { };
  return Image;
};
