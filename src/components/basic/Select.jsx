import { useEffect, useRef, useState } from "react";
import { GoTriangleDown } from "react-icons/go";

export default function Select({ data, handler, activeValue }) {
  const [isDorp, setIsDrop] = useState(false);
  const ref = useRef(null);

  const [value, setValue] = useState(activeValue || data[0]);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsDrop(false);
      }
    });
  }, []);

  useEffect(() => {
    setIsDrop(false);
  }, [activeValue]);

  return (
    <div ref={ref} className="select">
      <span onClick={() => setIsDrop(!isDorp)} className="active">
        {activeValue}
      </span>
      <button onClick={() => setIsDrop(!isDorp)} className="icon">
        <GoTriangleDown />
      </button>
      {isDorp && (
        <ul className="dropdown">
          {data.map((d, i) => (
            <li key={i}>
              <button
                onClick={() => {
                  handler(d);
                }}
              >
                {d}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
