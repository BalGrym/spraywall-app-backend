const { Sequelize, DataTypes } = require("sequelize");
const BlocModel = require("../models/bloc");
let blocs = require("./mock-blocs");

//Indiquer le port car le port defaut 3306 est déjà utilisé sur ma machine
const sequelize = new Sequelize(
  `${process.env.DBNAME}`,
  `${process.env.DBUSER}`,
  `${process.env.DBPASSWORD}`,
  {
    host: `${process.env.HOST}`,
    dialect: "mariadb",
    port: `${process.env.DBPORT}`,
    dialectOptions: {
      timezone: "Etc/GMT-2",
    },
    logging: false,
  }
);

const Bloc = BlocModel(sequelize, DataTypes);

//force: true => supprime les tables pour les recrer avec les modifications apporter / utile uniquement pour le dev
const initDb = () => {
  sequelize.sync({ force: true }).then((_) => {
    console.log("DB spraywall synchronisée.");

    //Ajout de quelques données pour la DB via le fichier mock-blocs.js
    blocs.map((bloc) => {
      Bloc.create({
        difficulty: bloc.difficulty,
        tags: bloc.tags,
        createdBy: bloc.createdBy,
        like: bloc.like,
        finished: bloc.finished,
      }).then((blocsSync) => console.log(blocsSync.toJSON()));
    });
  });
};

module.exports = {
  initDb,
  Bloc,
};
