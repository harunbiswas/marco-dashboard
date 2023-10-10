import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { BsFillBuildingsFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import values from "../../../values";
import Input from "../hotel-edit/Input";

export default function SaveTemplate({ handler, addhotel, setData, data }) {
  const [name, setName] = useState("");
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  const [isError, setIsError] = useState(false);

  const createHandler = () => {
    delete data?._id;
    if (name) {
      axios
        .post(`${values.url}/module/templete`, data, {
          headers: {
            token,
          },
        })
        .then((d) => {
          setData(d.data);
          handler(false);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    setIsError(false);
    if (typeof setData === "function") {
      setData((prev) => {
        return {
          ...prev,
          name,
        };
      });
    }
  }, [name]);

  const ref = useRef(null);
  const wrp = useRef(null);

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(false);
      }
    });
  });

  return (
    <div ref={wrp} className={`add-hotel ${(addhotel && "show") || ""}`}>
      <div ref={ref} className="add-hotel-inner">
        <div className="add-hotel-top">
          <span>
            <BsFillBuildingsFill />
          </span>
          <button onClick={() => handler(false)} className="close">
            <IoClose />
          </button>
        </div>
        <div className="add-hotel-body">
          <h4>Save Current List</h4>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div
              className={`add-hotel-item ${
                (isError && !name && "error") || ""
              }`}
            >
              <label htmlFor="">Configuration Name</label>
              <Input
                handler={setName}
                d={{ value: name, label: "Configuration Name" }}
              />
            </div>{" "}
          </form>
        </div>
        <div className="add-hotel-footer">
          <button onClick={() => handler(false)} className="btn cancel">
            Cancel
          </button>
          <button onClick={createHandler} className="btn">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
