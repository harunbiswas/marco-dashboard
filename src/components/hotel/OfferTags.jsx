import { useState } from "react";
import { BiPlus } from "react-icons/bi";

export default function OfferTags() {
  const [tags, setTags] = useState([
    "Hotel",
    "Half Board",
    "B&B",
    "new",
    "Beverage",
  ]);

  const [isInput, setIsInput] = useState();
  const [value, setValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    setTags((prev) => {
      return [...prev, value];
    });
    setValue("");
    setIsInput(false);
  };

  return (
    <ul className="offer-tags">
      {tags.map((d, i) => (
        <li key={i}>{d}</li>
      ))}
      <li className="new">
        {(!isInput && (
          <button onClick={() => setIsInput(true)}>
            <BiPlus />
            New tag
          </button>
        )) || (
          <form onSubmit={submitHandler}>
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              type="text"
            />
          </form>
        )}
      </li>
    </ul>
  );
}
