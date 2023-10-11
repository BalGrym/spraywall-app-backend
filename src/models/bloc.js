module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Bloc",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // image: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
      tags: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("tags").split(",");
        },
        set(tags) {
          this.setDataValue("tags", tags.join());
        },
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      like: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      finished: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
    }
  );
};
