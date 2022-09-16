//IMPORTS
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

const PORT = 8000;

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//ENDPOINTS
app.get("/planets", (req, res) => {
  //   req.params;
  //   req.query;
  //   req.body;

  axios
    .get("https://swapi.dev/api/planets")
    .then((res2) => {
      const planetList = res2.data.results;
      console.log(planetList);
      return res.status(200).send(planetList);
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.post("/planets/:newPlanetName", (req, res) => {
//   console.log(req.params);
// });

app.post("/planets", (req, res) => {
  console.log(req.body);
  //   res.status(200).send("Totally added a new planet!");
  res.sendStatus(200);
});

//APP LISTEN
app.listen(PORT, () => {
  console.log(`Server up and running on ${PORT}`);
});
