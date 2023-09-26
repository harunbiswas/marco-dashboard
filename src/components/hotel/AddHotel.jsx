import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { BsFillBuildingsFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import values from "../../../values";
import Input from "../hotel-edit/Input";

export default function AddHotel({ handler, addhotel }) {
  const navigate = useNavigate();
  const [tags, setTaqs] = useState([
    "Hotel",
    "B&B",
    "Residence",
    "Agriturismo",
    "Villaggio",
    "casa Vacanza",
  ]);

  const [hotelId, setHotelId] = useState(values.generateUniqueString());

  useEffect(() => {
    setHotelId(values.generateUniqueString());
  }, [addhotel]);

  const [name, setName] = useState("");
  const [active, setActive] = useState("");

  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState(false);
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  const createHandler = () => {
    if (hotelId && name && active) {
      const data = {
        id: hotelId,
        name,
        type: active,
      };
      axios
        .post(`${values.url}/hotel`, data, {
          headers: {
            token,
          },
        })
        .then((d) => {
          navigate(`/hotel/edit/${d.data._id}`);
        })
        .catch((e) => {
          if (e.response.data.id) {
            setErrors(e.response.data);
            setHotelId(e.response.data.id.msg);
          }
        });
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    setIsError(false);
  }, [name, active, hotelId]);

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
          <h4>Aggiungi un nuovo hotel</h4>
          <p>
            Crea l'hotel ID del nuovo Hotel, inserisci il nome e seleziona il
            tipo.
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div
              className={`add-hotel-item  ${
                (errors && errors.id && "error item-id") || ""
              }`}
            >
              <label htmlFor="">Hotel ID</label>
              <Input d={{ value: hotelId, label: "#" }} />
            </div>{" "}
            <div
              className={`add-hotel-item ${
                (isError && !name && "error") || ""
              }`}
            >
              <label htmlFor="">Nome Hotel</label>
              <Input
                handler={setName}
                d={{ value: name, label: "Inserisci il nome dell’hotel" }}
              />
            </div>{" "}
            <div
              className={`add-hotel-item ${
                (isError && !active && "error") || ""
              }`}
            >
              <label htmlFor="">Tipo Struttura</label>
              <ul className="add-hotel-item-type">
                {tags.map((d, i) => (
                  <li key={i}>
                    <button
                      className={(d === active && "active") || ""}
                      onClick={() => setActive(d)}
                    >
                      {d}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
        <div className="add-hotel-footer">
          <button onClick={() => handler(false)} className="btn cancel">
            Annulla
          </button>
          <button onClick={createHandler} className="btn">
            Crea Hotel
          </button>
        </div>
      </div>
    </div>
  );
}
