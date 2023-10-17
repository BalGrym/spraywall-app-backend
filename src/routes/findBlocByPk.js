const { Bloc } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/blocs/:id", (req, res) => {
    Bloc.findByPk(req.params.id)
      .then((bloc) => {
        if (bloc === null) {
          const message =
            "Le bloc que vous cherchez n'existe pas ! Essayez un autre identifiant.";
          return res.status(404).json({ message });
        }
        const message = `Le bloc ${req.params.id} a bien été trouvé.`;
        res.json({ message, data: bloc });
      })
      .catch((error) => {
        const message = `Le bloc n'a pas pu être récupéré. Ressayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
