module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Wall", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      //   type: DataTypes.BLOB("long"),
    },
  });
};
