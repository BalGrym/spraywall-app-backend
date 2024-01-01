const { Wall } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/walls", (req, res) => {
    Wall.findAll()
      .then((wall) => {
        const message = "La list des murs à bien été récupérée.";
        res.json({ message, data: wall });
      })
      .catch((error) => {
        const message =
          "La liste de murs n'a pas pu être récupérée. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
