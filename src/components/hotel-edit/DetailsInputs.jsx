import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { PiArrowSquareOutBold } from "react-icons/pi";
import { useParams } from "react-router-dom";
import values from "../../../values";
import Select from "../basic/Select";
import Input from "./Input";

export default function DetailsInputs({ data, setData }) {
  const [inputs, setInputs] = useState([]);
  const [textareas, setTextAreas] = useState([
    {
      label: "Descrizione Hotel",
      pls: "Inserisci la descrizione dell’hotel",
      value: "",
      name: "hotelDescription",
    },
    {
      label: "Riassunto Descrizione",
      pls: "Inserisci il riassunto della descrizione dell’hotel",
      value: "",
      name: "summaryDescription",
    },
    {
      label: "Descrizione Camere",
      pls: "Inserisci una descrizione delle camere",
      value: "",
      name: "roomsDescription",
    },
  ]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${values.url}/hotel/single?id=${id}`)
      .then((d) => {
        setInputs([
          {
            label: "Nome Hotel",
            value: d.data?.name,
          },
          {
            label: "Hotel ID",
            value: d.data?.id,
          },
          {
            label: "Morgana ID",
            value: d.data?.morganaId,
          },
          {
            label: "Sito Web Hotel",
            value: d.data?.hotelWebsite,
            url: true,
          },
          {
            label: "Email",
            value: d.data?.email,
          },
          {
            label: "Numero di Telefono",
            value: d.data?.phone,
            number: true,
          },

          {
            label: "Hotel XMLurl",
            value: d.data?.hotelXMLurl,
            url: true,
          },

          {
            label: "Priorità",
            value: d.data?.priority,
          },
        ]);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        name: inputs[0]?.value,
        morganaId: inputs[2]?.value,
        hotelWebsite: inputs[3]?.value,
        email: inputs[4]?.value,
        phone: inputs[5]?.value,
        hotelXMLurl: inputs[6]?.value,
        priority: inputs[7]?.value,
      };
    });
  }, [inputs]);

  const changeHandler = (label, newValue) => {
    if (label === "Priorità") {
      const updatedInputs = inputs.map((input) =>
        input.label === label ? { ...input, value: parseInt(newValue) } : input
      );
      setInputs(updatedInputs);
    } else if (label === "Hotel ID") {
      setInputs(inputs);
    } else {
      const updatedInputs = inputs.map((input) =>
        input.label === label ? { ...input, value: newValue } : input
      );
      setInputs(updatedInputs);
    }
  };

  const [isSpa, setIsSpa] = useState(data?.spaDescription);
  const [isRestu, setIsRestu] = useState(data?.restaurantDescription);

  useEffect(() => {
    setIsSpa(data?.spaDescription);
    setIsRestu(data?.restaurantDescription);
  }, [data]);
  return (
    <>
      <div className="hotel-form-details-wrp">
        {inputs.map((d, i) => (
          <div key={i} className="hotel-form-details-item">
            <label htmlFor={i}>{d.label}</label>
            <div className="inner">
              {d.number && <Select data={["🇱🇷", "🇧🇩", "🇸🇳"]} />}
              <Input handler={(e) => changeHandler(d.label, e)} d={d} i={i} />
              {d.url && (
                <a href={d.value} target="blank">
                  <PiArrowSquareOutBold />
                </a>
              )}
            </div>
          </div>
        ))}
        {/* item start  */}
        <div className="hotel-form-details-item full">
          <label htmlFor="">Descrizione Hotel</label>
          <div className="inner">
            <textarea
              name="hotelDescription"
              placeholder="Inserisci la descrizione dell’hotel"
              value={data?.hotelDescription}
              onChange={(e) => {
                setData((prev) => {
                  return {
                    ...prev,
                    hotelDescription: e.target.value,
                  };
                });
              }}
            ></textarea>
          </div>
        </div>
        {/* item end  */}
        {/* item start  */}
        <div className="hotel-form-details-item full">
          <label htmlFor="">Riassunto Descrizione</label>
          <div className="inner">
            <textarea
              name="hotelDescription"
              placeholder="Inserisci il riassunto della descrizione dell’hotel"
              value={data?.summaryDescription}
              onChange={(e) => {
                setData((prev) => {
                  return {
                    ...prev,
                    summaryDescription: e.target.value,
                  };
                });
              }}
            ></textarea>
          </div>
        </div>
        {/* item end  */}

        {/* item start  */}
        <div className="hotel-form-details-item full">
          <label htmlFor="">Descrizione Camere</label>
          <div className="inner">
            <textarea
              name="hotelDescription"
              placeholder="Inserisci una descrizione delle camere"
              value={data?.roomsDescription}
              onChange={(e) => {
                setData((prev) => {
                  return {
                    ...prev,
                    roomsDescription: e.target.value,
                  };
                });
              }}
            ></textarea>
          </div>
        </div>
        {/* item end  */}
      </div>
      <div className="buttons">
        {(isSpa && (
          <div className="hotel-form-details-item full">
            <label htmlFor="">Descrizione Camere</label>
            <div className="inner">
              <textarea
                name="hotelDescription"
                placeholder="Inserisci una descrizione delle camere"
                value={data?.spaDescription}
                onChange={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      spaDescription: e.target.value,
                    };
                  });
                }}
              ></textarea>
            </div>
          </div>
        )) || (
          <button
            onClick={(e) => {
              setIsSpa(true);
            }}
          >
            <BiPlus />
            Aggiungi Descrizione Spa
          </button>
        )}{" "}
        {(isRestu && (
          <div className="hotel-form-details-item full">
            <label htmlFor="">Descrizione Camere</label>
            <div className="inner">
              <textarea
                name="hotelDescription"
                placeholder="Inserisci una descrizione delle camere"
                value={data?.restaurantDescription}
                onChange={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      restaurantDescription: e.target.value,
                    };
                  });
                }}
              ></textarea>
            </div>
          </div>
        )) || (
          <button
            onClick={(e) => {
              setIsRestu(true);
            }}
          >
            <BiPlus />
            Aggiungi Descrizione Ristorante
          </button>
        )}
      </div>
    </>
  );
}
