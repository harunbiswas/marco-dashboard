import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { FaCarSide } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import values from "../../../values";
import Select from "../basic/Select";
import Input from "../hotel-edit/Input";
import Catagory from "./Catagory";
import Days from "./Days";
import Hours from "./Hours";

export default function AddTransport({
  handler,
  addhotel,
  add,
  transportData,
}) {
  const bg = add ? "transparent" : "red";
  const cl = add ? "black" : "white";

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const navigate = useNavigate();
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  // valid postale code
  const [isValid, setIsValid] = useState(true);
  const postalCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;

  const [address, setAddress] = useState("");

  const [isError, setIsError] = useState(false);

  const createHandler = () => {
    if (postalCodeRegex.test(data?.zip) && data.pricing.length) {
      if (data?.name) {
        if (add) {
          axios
            .post(`${values.url}/transport`, data, {
              headers: {
                token,
              },
            })
            .then((d) => {
              window.location.reload();
            })
            .catch((e) => {
              console.log(e.response);
            });
        } else {
          axios
            .put(`${values.url}/transport`, data, {
              headers: {
                token,
              },
            })
            .then((d) => {
              window.location.reload();
            })
            .catch((e) => {
              console.log(e.response);
            });
        }
      } else {
        setIsError(true);
      }
    } else {
      if (!postalCodeRegex.test(data?.zip)) {
        setIsValid(false);
      }
    }
  };

  const ref = useRef(null);
  const wrp = useRef(null);

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(false);
      }
    });
  });

  // development
  const [data, setData] = useState({
    name: "",
    transportId: values.generateUniqueString(),
    city: "",
    state: "",
    zip: "",
    address: "",
    vehicleType: "",
    vehicleBrand: "",
    startingDate: "",
    endingDate: "",
    days: [],
    pricing: [],
    hours: [],
  });

  const [citysName, setCitysName] = useState([
    "Abruzzo",
    "Basilicata",
    "Calabria",
    "Campania",
    "Emilia-Romagna",
    "Friuli-Venezia Giulia",
    "Lazio",
    "Liguria",
    "Lombardia",
    "Marche",
    "Molise",
    "Piemonte",
    "Puglia",
    "Sardegna",
    "Sicilia",
    "Toscana",
    "Trentino-Alto Adige",
    "Umbria",
    "Valle d'Aosta",
    "Veneto",
  ]);

  // update data

  useEffect(() => {
    if (transportData) {
      setData(transportData);
    } else {
      setData({
        name: "",
        transportId: values.generateUniqueString(),
        city: "",
        state: "",
        zip: "",
        address: "",
        vehicleType: "",
        vehicleBrand: "",
        startingDate: "",
        endingDate: "",
        days: [],
        pricing: [],
        hours: [],
      });
    }
  }, [transportData]);

  // delete
  const [isDelete, setIsDelete] = useState(false);

  const deleteHandler = () => {
    axios
      .delete(`${values.url}/transport?id=${data?._id}`, {
        headers: {
          token,
        },
      })
      .then((d) => {
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(data);
  return (
    <div
      ref={wrp}
      className={`add-hotel ${(addhotel && "show") || ""} add-transport`}
    >
      <div ref={ref} className="add-hotel-inner">
        <div className="add-hotel-top">
          <span>
            <FaCarSide />
          </span>
          <button onClick={() => handler(false)} className="close">
            <IoClose />
          </button>
        </div>
        <div className="add-hotel-body">
          <h4 className="s-title">
            {(add && "Crea un nuovo Trasporto") || "Modifica Trasporto"}
          </h4>
          <p>Inserisci o modifica le informazioni del trasporto qui sotto</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div
              className={`add-hotel-item item-1 ${(isError && "error") || ""}`}
            >
              <label htmlFor="">Nome Trasporto</label>
              <Input
                d={{ value: data?.name, label: "Nome Trasporto" }}
                handler={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      name: e,
                    };
                  });
                }}
              />
            </div>{" "}
            <div className={`add-hotel-item `}>
              <label htmlFor="">Trasporto ID</label>
              <Input
                d={{ value: data?.transportId, label: "Trasporto ID" }}
                handler={() => {
                  return;
                }}
              />
            </div>{" "}
          </form>

          <h4>Punto di Partenza</h4>
          <div className="add-transport-group">
            <div className="form-group">
              <label htmlFor="">Regione</label>
              <Select
                activeValue={data?.city || "Select Regione"}
                handler={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      city: e,
                      state: " ",
                    };
                  });
                }}
                data={citysName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Città</label>
              <Input
                d={{
                  value: data?.state,
                  label: "Città",
                }}
                handler={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      state: e,
                    };
                  });
                }}
              />
            </div>
            <div className={`form-group ${(!isValid && "error") || ""}`}>
              <label htmlFor="">Codice Postale</label>
              <Input
                d={{ value: data?.zip, label: "Codice Postale" }}
                handler={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      zip: e,
                    };
                  });
                  setIsValid(true);
                }}
              />
            </div>
          </div>
          <div className="add-transport-group">
            <div className="form-group">
              <label htmlFor="">Coordinate Punto di Partenza</label>
              <Input
                d={{
                  value: data?.address,
                  label:
                    "Inserisci Coordinate (42.69325378735576, 11.708567085372382)",
                }}
                handler={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      address: e,
                    };
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="add-hotel-body gap">
          <h4>Dettagli Trasporto</h4>
          <div className="add-transport-group">
            <div className="form-group">
              <label htmlFor="">Tipo di Veicolo</label>
              <Select
                activeValue={
                  data?.vehicleType || "Seleziona un tipo di veicolo"
                }
                handler={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      vehicleType: e,
                      vehicleBrand: "",
                    };
                  });
                }}
                data={["Treno", "Bus", "Aereo", "Nave"]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Marchio</label>
              <Select
                activeValue={data?.vehicleBrand || "Seleziona un Marchio"}
                handler={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      vehicleBrand: e,
                    };
                  });
                }}
                data={
                  (data?.vehicleType === "Treno" && [
                    "Italo",
                    "Frecciarossa",
                  ]) ||
                  (data?.vehicleType === "Bus" && [
                    "Nostro",
                    "Itabus",
                    "FlixBus",
                  ]) ||
                  (data?.vehicleType === "Aereo" && [
                    "Ryanair",
                    "Ita",
                    "EasyJet",
                    "Vuelig",
                    "Wizz",
                  ]) ||
                  (data?.vehicleType === "Nave" && [
                    "Medmar",
                    "Caremar",
                    "Alilauro",
                  ]) ||
                  []
                }
              />
            </div>
          </div>
        </div>
        <div className="add-hotel-body gap">
          <h4>Periodo di Validità</h4>
          <p>
            Inserisci il periodo di validità in cui verrà preso in
            considerazione questo trasporto
          </p>
          <div className="add-transport-group">
            <div className="form-group">
              <label htmlFor="">Data d’inizio</label>
              <input
                value={data?.startingDate}
                max={data?.endingDate}
                onChange={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      startingDate: e.target.value,
                    };
                  });
                }}
                type="date"
                name=""
                id=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Data finale</label>
              <input
                value={data?.endingDate}
                min={data?.startingDate}
                onChange={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      endingDate: e.target.value,
                    };
                  });
                }}
                type="date"
                name=""
                id=""
              />
            </div>
          </div>
          <Days
            transportData={transportData}
            data={data?.days}
            setData={setData}
            add={add}
          />
          <div className="hours">
            <h4>Orari di Partenza</h4>
            <Hours
              transportData={transportData}
              data={data?.hours}
              handler={setData}
            />
          </div>
        </div>{" "}
        <div className="add-hotel-body gap">
          <h4>Prezzo per Categoria</h4>
          <Catagory
            transportData={transportData}
            add={add}
            data={data?.pricing}
            setData={setData}
          />
        </div>
        <div className="add-hotel-footer">
          <button
            style={{ backgroundColor: bg, color: cl }}
            onClick={() => {
              (add && handler(false)) || setIsDelete(true);
            }}
            className="btn cancel "
          >
            {(add && "Torna Indietro") || "Annulla"}
          </button>
          <button onClick={createHandler} className="btn">
            {(add && "Aggiungi Nuovo Trasporto") || "Salva Modifiche"}
          </button>
        </div>
      </div>

      {isDelete && (
        <div className="isdelete">
          <h2 className="jakarta">Vuoi eliminare {data?.name}?</h2>
          <p className="jakarta">
            Eliminandolo non sarà più possibile recuperarlo
          </p>
          <div className="buttons">
            <button
              onClick={() => {
                setIsDelete(false);
                handler(false);
              }}
              className="btn"
            >
              Annulla
            </button>
            <button onClick={deleteHandler} className="delete-btn btn">
              Elimina
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
