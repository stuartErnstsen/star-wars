const axios = require("axios");

module.exports = {
  getPlanets: async (req, res) => {
    const { sequelize } = req.app.get("db");

    //Get list of our current favorite planets
    const [myFavePlanets] = await sequelize.query(`
          select * from favorite_planets;
        `);

    console.log("MY PLANETS: ", myFavePlanets);

    axios
      .get("https://swapi.dev/api/planets")
      .then((res2) => {
        const planetList = res2.data.results;

        const planetListWithFaves = planetList.map((planet) => {
          const isFav = myFavePlanets.some(
            (favePlanet) => favePlanet.name === planet.name
          );
          return {
            ...planet,
            isFav,
          };
        });

        return res.status(200).send(planetListWithFaves);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  savePlanet: async (req, res) => {
    const { planetName, planetList } = req.body;

    await sequelize.query(`
      insert into favorite_planets (
        name
      ) values (
        '${planetName}'
      );
    `);

    const planetListWithFaves = planetList.map((planet) => {
      const isFav = planet.isFav || planet.name === planetName;
      console.log("WTF IS THIS: ", isFav);
      return {
        ...planet,
        isFav,
      };
    });

    res.status(200).send(planetListWithFaves);
  },
};
