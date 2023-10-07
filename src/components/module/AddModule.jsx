import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { BsFillBuildingsFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import values from "../../../values";
import Input from "../hotel-edit/Input";

export default function AddModule({ handler, addhotel }) {
  const navigate = useNavigate();
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;
  const [hotelId, setHotelId] = useState("");
  const [name, setName] = useState("");

  const [isError, setIsError] = useState(false);

  const createHandler = () => {
    if (hotelId && name) {
      axios
        .post(
          `${values.url}/module`,
          { name, id: hotelId },
          {
            headers: {
              token,
            },
          }
        )
        .then((d) => {
          navigate(`/module/edit/${d.data._id}`);
        })
        .catch((e) => {
          setIsError(e.response.data);
        });
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    setIsError(false);
  }, [name, hotelId]);

  const ref = useRef(null);
  const wrp = useRef(null);

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(false);
      }
    });
  });

  useEffect(() => {
    setHotelId(values.generateUniqueString());
  }, [addhotel]);

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
          <h4>Add New Module</h4>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div
              className={`add-hotel-item ${
                (isError && !hotelId && "error") || ""
              }`}
            >
              <label htmlFor="">Hotel ID</label>
              <Input d={{ value: hotelId, label: "#" }} handler={setHotelId} />
            </div>{" "}
            <div
              className={`add-hotel-item ${
                (isError && !name && "error") || ""
              }`}
            >
              <label htmlFor="">Module Name</label>
              <Input
                handler={setName}
                d={{ value: name, label: "Enter module name" }}
              />
            </div>{" "}
          </form>
        </div>
        <div className="add-hotel-footer">
          <button onClick={() => handler(false)} className="btn cancel">
            Cancel
          </button>
          <button onClick={createHandler} className="btn">
            Create Module
          </button>
        </div>
      </div>
    </div>
  );
}
