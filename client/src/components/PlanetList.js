import { useEffect, useState } from "react";
import axios from "axios";
import PlanetItem from "./PlanetItem";

export default function PlanetList() {
  const [planetList, setPlanetList] = useState([]);

  useEffect(() => {
    axios
      .get("/planets")
      .then((res) => {
        console.log(res.data);
        setPlanetList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const displayPlanetList = planetList.map((planetInfo) => {
    const { name, population } = planetInfo;
    return <PlanetItem key={name} name={name} population={population} />;
  });

  return (
    <div className="planet-container">
      <h1>PLANET LIST!!!</h1>
      {displayPlanetList}
    </div>
  );
}
