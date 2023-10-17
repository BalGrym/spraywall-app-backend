const { Bloc } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/blocs/:id", (req, res) => {
    Bloc.findByPk(req.params.id)
      .then((bloc) => {
        if (bloc === null) {
          const message =
            "Le bloc que vous cherchez n'existe pas ! Essayez un autre identifiant.";
          return res.status(404).json({ message });
        }
        const blocDeleted = bloc;
        return Bloc.destroy({
          where: { id: bloc.id },
        }).then(() => {
          const message = `Le bloc avec l'identifiant ${blocDeleted.id} a bien été supprimé.`;
          res.json({ message, data: blocDeleted });
        });
      })
      .catch((error) => {
        const message = `Le bloc n'a pas pu être supprimé. Ressayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
