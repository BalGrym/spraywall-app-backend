require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");
const app = express();

app.use(bodyParser.json());

sequelize.initDb();

//ENDPOINT
require("./src/routes/findAllBlocs")(app);
require("./src/routes/findBlocByPk")(app);
require("./src/routes/createBloc")(app);
require("./src/routes/updateBloc")(app);
require("./src/routes/deleteBloc")(app);
require("./src/routes/findWall")(app);

//ENDPOINT ERROR 404
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Essayez une autre URL.";
  res.status(404).json({ message });
});

app.listen(process.env.PORT, () => console.log(`Application Node started.`));
