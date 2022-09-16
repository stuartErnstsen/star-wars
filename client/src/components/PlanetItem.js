export default function PlanetItem(props) {
  const { name, population } = props;
  return (
    <div>
      <p>Name: {name}</p>
      <p>Population: {population}</p>
    </div>
  );
}
