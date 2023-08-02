import { Link } from "react-router-dom";

export default function Dropdown({ data }) {
  return (
    <ul className="dropdown">
      {data.map((d, i) => (
        <li key={i}>
          <Link to={d?.url}>{d?.name}</Link>
        </li>
      ))}
    </ul>
  );
}
