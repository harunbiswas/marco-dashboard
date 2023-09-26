import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import values from "../../../values";

export default function TagInput({ tags, handler, name, setData }) {
  const [active, setActive] = useState([]);
  const [isInput, setIsInput] = useState(false);
  const [value, setValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    handler((prev) => {
      return [...prev, { name: value }];
    });
    setActive((prev) => {
      return [...prev, value];
    });
    setValue("");
    setIsInput(false);
  };

  const { id } = useParams();
  useEffect(() => {
    axios.get(`${values.url}/hotel/single?id=${id}`).then((d) => {
      if (name === "include") {
        setActive(d.data?.services);
      } else {
        setActive(d.data?.strengths);
      }
    });
  }, []);

  useEffect(() => {
    if (name === "include") {
      setData((prev) => {
        return {
          ...prev,
          services: active,
        };
      });
    } else {
      setData((prev) => {
        return {
          ...prev,
          strengths: active,
        };
      });
    }
  }, [active]);

  return (
    <ul className="tag-input">
      {tags.map((d, i) => (
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
      {(!isInput && (
        <button onClick={() => setIsInput(true)}>
          <AiOutlinePlus />
          Add More
        </button>
      )) || (
        <form onSubmit={(e) => submitHandler(e)}>
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            type="text"
          />
        </form>
      )}
    </ul>
  );
}
