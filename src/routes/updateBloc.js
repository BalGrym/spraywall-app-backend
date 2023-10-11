const { Bloc } = require("../db/sequelize");

module.exports = (app) => {
  app.put("/api/blocs/:id", (req, res) => {
    const id = req.params.id;
    Bloc.update(req.body, {
      where: { id: id },
    }).then(() => {
      Bloc.findByPk(id).then((bloc) => {
        const message = `Le bloc ${bloc.id} a bien été modifié.`;
        res.json({ message, data: bloc });
      });
    });
  });
};
