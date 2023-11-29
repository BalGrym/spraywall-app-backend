const { ValidationError } = require("sequelize");
const { Bloc } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/blocs", (req, res) => {
    Bloc.create(req.body)
      .then((bloc) => {
        const message = `Le bloc ${bloc.id} a bien été créé.`;
        res.json({ message, data: bloc });
      })
      .catch((error) => {
        //Retourne erreur status 400 si c'est une erreur de validation dans le models plutôt qu'un code 500
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le bloc n'a pas pu être ajouté. Ressayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
