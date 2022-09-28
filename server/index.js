//IMPORTS
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");

const app = express();

const { PORT, CONNECTION_STRING } = process.env;

//CONTROLLERS
const planetCtrl = require("./controllers/planetController");

//MIDDLEWARE
app.use(express.json());
app.use(cors());

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

sequelize.authenticate().then(() => {
  app.set("db", {
    sequelize,
  });

  //ENDPOINTS
  app.get("/planets", planetCtrl.getPlanets);
  app.post("/planets", planetCtrl.savePlanet);

  //APP LISTEN
  app.listen(PORT, () => {
    console.log(`Server up and running on ${PORT}`);
  });
});
