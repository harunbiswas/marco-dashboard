import { useState } from "react";

export default function TagInput({ data }) {
  const [active, setActive] = useState([data[0].name, data[3].name]);

  return (
    <ul className="tag-input">
      {data.map((d, i) => (
        <li
          onClick={() => {
            if (!active.includes(d.name)) {
              setActive((prev) => {
                return [...prev, d.name];
              });
            } else {
              const updatedItems = active.filter((item) => item !== d.name);
              setActive(updatedItems);
            }
          }}
          className={(active.includes(d.name) && "active") || ""}
          key={i}
        >
          {d.icon}
          {d.name}
        </li>
      ))}
    </ul>
  );
}
