export default function PlanetItem(props) {
  const { name, savePlanet, planetInfo } = props;

  const { isFav } = planetInfo;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <p>Name: {name}</p>
      {!isFav ? (
        <button onClick={() => savePlanet(name)}>SAVE PLANET</button>
      ) : null}
    </div>
  );
}
