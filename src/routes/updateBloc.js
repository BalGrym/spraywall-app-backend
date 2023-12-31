const { ValidationError } = require("sequelize");
const { Bloc } = require("../db/sequelize");

module.exports = (app) => {
  app.put("/api/blocs/:id", (req, res) => {
    const id = req.params.id;
    Bloc.update(req.body, {
      where: { id: id },
    })
      .then(() => {
        return Bloc.findByPk(id).then((bloc) => {
          if (bloc === null) {
            const message =
              "Le bloc que vous cherchez n'existe pas ! Essayez un autre identifiant.";
            return res.status(404).json({ message });
          }
          const message = `Le bloc ${bloc.id} a bien été modifié.`;
          res.json({ message, data: bloc });
        });
      })
      .catch((error) => {
        //Retourne erreur status 400 si c'est une erreur de validation dans le models plutôt qu'un code 500
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le bloc n'a pas pu être modifié. Ressayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
