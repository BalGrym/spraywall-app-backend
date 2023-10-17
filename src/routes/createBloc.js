const { Bloc } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/blocs", (req, res) => {
    Bloc.create(req.body)
      .then((bloc) => {
        const message = `Le bloc ${bloc.id} a bien été créé.`;
        res.json({ message, data: bloc });
      })
      .catch((error) => {
        const message = `Le bloc n'a pas pu être ajouté. Ressayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
