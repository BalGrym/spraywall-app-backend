const { Bloc } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/blocs/:id", (req, res) => {
    Bloc.findByPk(req.params.id).then((bloc) => {
      const message = `Le bloc ${req.params.id} a bien été trouvé.`;
      res.json({ message, data: bloc });
    });
  });
};
