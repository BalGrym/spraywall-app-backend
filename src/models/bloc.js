module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Bloc",
    {
      //rename to blocID ?
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La difficulté est une propriété requise. Veuillez saisir une difficulté.",
          },
          notNull: { msg: "La difficulté est une propriété requise." },
          len: {
            args: [2, 3],
            msg: "La difficulté doit faire 2 à 3 charactères maximum.",
          },
          //Validateur qui renvoie une erreur si le chiffre n'est pas entre 3 et 9.
          correctNumber(value) {
            const splitedValue = value.split("");
            if (splitedValue[0] < 3 || splitedValue[0] > 9) {
              throw new Error(
                "Le chiffre de la difficulté doit être entre 3 et 9."
              );
            }
          },
          //Validateur qui renvoie une erreur si la lettre n'est ni a, ni b, ni c.
          correctLetter(value) {
            const splitedValue = value.split("");
            if (
              splitedValue[1].toLowerCase() !== "a" &&
              splitedValue[1].toLowerCase() !== "b" &&
              splitedValue[1].toLowerCase() !== "c"
            ) {
              throw new Error(
                "La lettre de la difficulté doit être 'a' 'b' ou 'c'."
              );
            }
          },
          //Validateur qui renvoie une erreur si il y a un signe qui n'est pas un "+".
          correctSign(value) {
            const splitedValue = value.split("");
            if (splitedValue[2] !== undefined && splitedValue[2] !== "+") {
              throw new Error(
                "Après le chiffre et la lettre de difficulté, il n'est autorisé de mettre un '+' ou bien de laisser vide."
              );
            }
          },
        },
      },
      // image: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
      tags: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Les tags sont des propriétés requises. Veuillez saisir un ou plusieurs tags. ",
          },
          notNull: { msg: "Les tags sont des propriétés requises." },
        },
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
