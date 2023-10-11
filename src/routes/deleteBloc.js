const { Bloc } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/blocs/:id", (req, res) => {
    Bloc.findByPk(req.params.id).then((bloc) => {
      const blocDeleted = bloc;
      Bloc.destroy({
        where: { id: bloc.id },
      }).then(() => {
        const message = `Le bloc avec l'identifiant ${blocDeleted.id} a bien été supprimé.`;
        res.json({ message, data: blocDeleted });
      });
    });
  });
};
