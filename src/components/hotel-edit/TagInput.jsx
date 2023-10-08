import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import values from "../../../values";
import Cookies from "js-cookie";

const isAlreadyPresentInTags = (inputString, array) => {
  const cleanInputString = inputString.replace(/\s/g, "").toLowerCase();
  const cleanArray = array.map((str) => str.replace(/\s/g, "").toLowerCase());
  return cleanArray.includes(cleanInputString);
};

export default function TagInput({ tags, handler, name, setData, data }) {
  const [active, setActive] = useState([]);
  const [isInput, setIsInput] = useState(false);
  const [value, setValue] = useState("");

  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  const submitHandler = async (e) => {

    e.preventDefault();
    console.log(
      "handle submit is clicked",
      e
    );
    if(!value) return
    if (!isAlreadyPresentInTags(value, tags)) {
      try {
        await axios.post(
          `${values.url}/tag`,
          { tag: value, tagCat: name },
          {
            headers: {
              token,
            },
          }
        );
        handler((prev) => {
          console.log([...prev, value])
          return [...prev, value];
        });
        setActive((prev) => {
          console.log([...prev, value])
          return [...prev, value];
        });
      } catch (error) {
        console.log(error);
      }
    }
    setValue("");
    setIsInput(false);
  };

  const { id } = useParams();
  useEffect(() => {
    // axios.get(`${values.url}/hotel/single?id=${id}`).then((d) => {
      console.log("id," , data)
      if (name === "hotelServices") {
        setActive(data?.services ?? []);
      } else if(name === "offerTags") {
        setActive(Array.isArray(data) ? data :  data?.offerTags ?? []);
      } else {
        setActive(data?.strengths ?? []);
      }
    // });
  }, []);

  useEffect(() => {
    if (name === "hotelServices") {
      setData((prev) => {
        return {
          ...prev,
          services: active,
        };
      });
    } else if(name === "offerTags") {
      setData(active);
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
      {tags.map((tag, i) => (
        <li
          onClick={() => {
            if (!active.includes(tag)) {
              setActive((prev) => {
                return [...prev, tag];
              });
            } else {
              const updatedItems = active.filter((item) => item !== tag);
              setActive(updatedItems);
            }
          }}
          className={(active.includes(tag) && "active") || ""}
          key={i}
        >
          {/* {d.icon} */}
          {tag}
        </li>
      ))}
      {(!isInput && (
        <button onClick={() => setIsInput(true)}>
          <AiOutlinePlus />
          Add More
        </button>
      )) || (
        <form onSubmit={submitHandler}>
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            type="text"
          />
          <button
            type="submit"
            // onClick={submitHandler}
            disabled={!value || tags.includes(value)}
          >
            <AiOutlinePlus />
          </button>
        </form>
      )}
    </ul>
  );
}
