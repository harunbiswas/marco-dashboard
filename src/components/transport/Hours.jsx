import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Hours({ data, handler }) {
  const [hours, setHours] = useState(["08:30"]);
  const [isInput, setIsInput] = useState(false);
  const [active, setActive] = useState([]);
  const [value, setValue] = useState("08:30");

  useEffect(() => {
    handler((prev) => {
      return {
        ...prev,
        hours: active,
      };
    });
  }, [active]);

  const changeHandler = (e) => {
    setValue(e.target.value);
    setHours((prev) => {
      return [...prev, e.target.value];
    });
    setActive((prev) => {
      return [...prev, e.target.value];
    });
    setIsInput(false);
  };
  return (
    <ul className="hours-inner">
      {hours.map((d, i) => (
        <li
          className={data?.includes(d) && "active"}
          key={i}
          onClick={() => {
            if (active.includes(d)) {
              const update = active.filter((e) => {
                return d !== e;
              });

              setActive(update);
            } else {
              setActive((prev) => {
                return [...prev, d];
              });
            }
          }}
        >
          {d}
        </li>
      ))}
      {(isInput && (
        <form onSubmit={changeHandler}>
          <input
            type="time"
            name="time"
            value={value}
            step="1800"
            onChange={changeHandler}
            id=""
          />
        </form>
      )) || (
        <button onClick={() => setIsInput(true)}>
          <AiOutlinePlus /> Aggiungi Altri
        </button>
      )}
    </ul>
  );
}
