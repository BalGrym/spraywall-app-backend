const { Bloc } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/blocs", (req, res) => {
    Bloc.findAll()
      .then((bloc) => {
        const message = "La liste des blocs a bien été récupérée.";
        res.json({ message, data: bloc });
      })
      .catch((error) => {
        const message = `La liste de blocs n'a pas pu être récupérée. Ressayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
