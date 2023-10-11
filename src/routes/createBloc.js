const { Bloc } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/blocs", (req, res) => {
    Bloc.create(req.body).then((bloc) => {
      const message = `Le bloc ${bloc.id} a bien été créé.`;
      res.json({ message, data: bloc });
    });
  });
};
