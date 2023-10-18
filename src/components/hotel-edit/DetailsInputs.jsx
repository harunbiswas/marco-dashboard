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
  const { id } = useParams();
  const [isSpa, setIsSpa] = useState(false);
  // const [isRestu, setIsRestu] = useState(Boolean(data?.restaurantDescription));
  const [isRestu, setIsRestu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${values.url}/hotel/single?id=${id}`);
        const { data } = response;
        setIsSpa(Boolean(data?.spaDescription));
        setIsRestu(Boolean(data?.restaurantDescription));

        const inputsData = [
          { label: "Nome Hotel", value: data?.name },
          { label: "Hotel ID", value: data?.id },
          { label: "Morgana ID", value: data?.morganaId },
          { label: "Sito Web Hotel", value: data?.hotelWebsite, url: true },
          { label: "Email", value: data?.email },
          { label: "Numero di Telefono", value: data?.phone, number: true },
          { label: "Hotel XMLurl", value: data?.hotelXMLurl, url: true },
          { label: "Priorità", value: data?.priority },
        ];

        setInputs(inputsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

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

  // useEffect(() => {
  //   console.log("Data useeffect ", Boolean(data?.restaurantDescription))
  //   setIsSpa(data?.spaDescription);
  //   setIsRestu(Boolean(data?.restaurantDescription));
  // }, [data]);

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
            <label htmlFor="">Descrizione Spa</label>
            <div className="inner">
              <textarea
                name="hotelDescription"
                placeholder="Inserisci una descrizione delle spa"
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
        {isRestu ? (
          <div className="hotel-form-details-item full">
            <label htmlFor="hotelDescription">Descrizione ristorante</label>
            <div className="inner">
              <textarea
                name="hotelDescription"
                placeholder="Inserisci una descrizione delle ristorante"
                value={data?.restaurantDescription}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    restaurantDescription: e.target.value,
                  }))
                }
              ></textarea>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              console.log(isRestu);
              setIsRestu(true);
            }}
          >
            <BiPlus />
            Aggiungi Descrizione Ristorante {isRestu.toString()}
          </button>
        )}
      </div>
    </>
  );
}
