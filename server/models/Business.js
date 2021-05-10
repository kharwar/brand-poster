module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define("Business", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    website: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING
    },
  });

  Business.associate = (models) => {
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      onDelete: 'CASCADE',
      as: 'ownedBy'
    });
  };
  return Business;
};
