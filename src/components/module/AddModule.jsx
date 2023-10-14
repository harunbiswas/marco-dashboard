import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
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
  const [isLoading, setIsloading] = useState(false);

  const createHandler = () => {
    if (hotelId && name) {
      setIsloading(true);
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
          setIsloading(false);
          navigate(`/module/edit/${d.data._id}`);
        })
        .catch((e) => {
          setIsloading(false);
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.4635 1.37373C15.3214 1.24999 13.8818 1.24999 12.0453 1.25H11.9547C10.1182 1.24999 8.67861 1.24999 7.53648 1.37373C6.37094 1.50001 5.42656 1.76232 4.62024 2.34815C4.13209 2.70281 3.70281 3.13209 3.34815 3.62024C2.76232 4.42656 2.50001 5.37094 2.37373 6.53648C2.24999 7.67861 2.24999 9.11822 2.25 10.9548V13.0453C2.24999 14.8818 2.24999 16.3214 2.37373 17.4635C2.50001 18.6291 2.76232 19.5734 3.34815 20.3798C3.70281 20.8679 4.13209 21.2972 4.62024 21.6518C5.42656 22.2377 6.37094 22.5 7.53648 22.6263C8.67859 22.75 10.1182 22.75 11.9547 22.75H12.0453C13.8818 22.75 15.3214 22.75 16.4635 22.6263C17.6291 22.5 18.5734 22.2377 19.3798 21.6518C19.8679 21.2972 20.2972 20.8679 20.6518 20.3798C21.2377 19.5734 21.5 18.6291 21.6263 17.4635C21.75 16.3214 21.75 14.8818 21.75 13.0453V10.9547C21.75 9.11824 21.75 7.67859 21.6263 6.53648C21.5 5.37094 21.2377 4.42656 20.6518 3.62024C20.2972 3.13209 19.8679 2.70281 19.3798 2.34815C18.5734 1.76232 17.6291 1.50001 16.4635 1.37373ZM6 9.5C6 8.94772 6.44771 8.5 7 8.5H15C15.5523 8.5 16 8.94772 16 9.5C16 10.0523 15.5523 10.5 15 10.5H7C6.44771 10.5 6 10.0523 6 9.5ZM6 14.5C6 13.9477 6.44771 13.5 7 13.5H10C10.5523 13.5 11 13.9477 11 14.5C11 15.0523 10.5523 15.5 10 15.5H7C6.44771 15.5 6 15.0523 6 14.5Z"
                fill="#005CAB"
              />
            </svg>
          </span>
          <button onClick={() => handler(false)} className="close">
            <IoClose />
          </button>
        </div>
        <div className="add-hotel-body">
          <h4>Crea un nuovo Modulo</h4>
          <p>Inserisci il nome e clicca su Crea Modulo</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div
              className={`add-hotel-item ${
                (isError && !hotelId && "error") || ""
              }`}
            >
              <label htmlFor="">Modulo ID</label>
              <Input d={{ value: hotelId, label: "#" }} />
            </div>{" "}
            <div
              className={`add-hotel-item ${
                (isError && !name && "error") || ""
              }`}
            >
              <label htmlFor="">Nome Modulo</label>
              <Input
                handler={setName}
                d={{ value: name, label: "Inserisci il nome del modulo" }}
              />
            </div>{" "}
          </form>
        </div>
        <div className="add-hotel-footer sdjfjsldflskadf">
          <button onClick={() => handler(false)} className="btn cancel">
            Annulla
          </button>

          {(isLoading && (
            <button disabled className="jakarta spinner btn ">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </button>
          )) || (
            <button onClick={createHandler} className="btn">
              Crea Modulo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
