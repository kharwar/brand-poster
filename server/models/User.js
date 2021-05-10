const { USER_ROLE } = require("../../api/utils/user/constant");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNo: {
      type: DataTypes.DOUBLE
    },
    role: {
      type: DataTypes.ENUM(USER_ROLE.ADMIN, USER_ROLE.USER),
      default: USER_ROLE.USER
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Business, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'businesses',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
