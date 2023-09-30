import moment from "moment";
import "moment/locale/it";
import { useEffect, useState } from "react";
import {
  BiEdit,
  BiSolidDollarCircle,
  BiSolidLocationPlus,
} from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TransportItem({ handler, data, setTransportData }) {
  const [prics, setPrics] = useState([
    {
      naem: "Adult",
      tag: "Age 18 +",
      price: 120,
      discount: 5,
    },
    {
      naem: "Kit",
      tag: "Age 0-6",
      price: 80,
      discount: 10,
    },
    {
      naem: "Luggage",
      tag: "Max Weight 15 KG",
      price: 30,
      max: 5,
    },
    {
      naem: "Dog",
      tag: "Max Weight 5 KG",
      price: 60,
    },
  ]);

  useEffect(() => {
    moment.locale("it"); // Set the locale
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
    localeMatcher: "best fit",
  };

  const [isDetails, setIsDetails] = useState(false);
  const formattedDate = (value) =>
    new Intl.DateTimeFormat("it-IT", options).format(value);

  return (
    <div className="item">
      <div className="item-top-wrp">
        <div className={`item-top ${isDetails && "bg-grey"}`}>
          <div className="content">
            <strong>{data?.name}</strong>
            <span>
              {data?.startingDate &&
                moment(data?.startingDate).format("dddd MM")}
              -
              {data?.endingDate &&
                moment(data?.endingDate).format("dddd MM YYYY")}
            </span>
          </div>

          <Link
            onClick={() => {
              if (!isDetails) {
                setIsDetails(true);
              } else {
                handler(true);
                setTransportData(data);
              }
            }}
            to=""
          >
            {isDetails && <BiEdit />}{" "}
            {(!isDetails && "Vedi Dettagli") || "Modifica Trasporto"}
          </Link>
        </div>
        {!isDetails && (
          <div className="item-bottom">
            <span>
              <FaCarSide /> {data?.vehicleType}
            </span>
            <span>
              <BiSolidLocationPlus /> {data?.city} {data?.state} {data?.zip}
            </span>
          </div>
        )}
      </div>
      <div className={`item-body ${isDetails && "show"}`}>
        <div className="item-body-item">
          <div className="item-body-item-inner">
            <div className="icon">
              <BiSolidLocationPlus />
            </div>
            <div className="content">
              <span>Punto di Partenza</span>
              <strong>
                {data?.city} {data?.state} {data?.zip}
              </strong>
            </div>
          </div>
        </div>
        <div className="item-body-item">
          <div className="item-body-item-inner">
            <div className="icon">
              <FaCarSide />
            </div>
            <div className="content">
              <span>Tipo di Veicolo</span>
              <strong>{data?.vehicleType}</strong>
            </div>
          </div>{" "}
          <div className="item-body-item-inner">
            <div className="icon">
              <FaCarSide />
            </div>
            <div className="content">
              <span>Marchio</span>
              <strong>{data?.vehicleBrand}</strong>
            </div>
          </div>
        </div>

        <div className="item-body-item catagory">
          <div className="item-body-item-inner">
            <div className="icon">
              <BiSolidDollarCircle />
            </div>
            <div className="content">
              <span>Prezzo per Categoria</span>
            </div>
          </div>
          <div className="item-body-item-pricing">
            {data?.pricing?.map((d, i) => (
              <div
                className={`item ${
                  (d?.name === "Adulti" || d?.name === "Bambini") && "disc"
                }`}
                key={i}
              >
                <strong>
                  {d?.name}
                  {(d?.name === "Bambini" && (
                    <span> (Età Massima {d?.age})</span>
                  )) ||
                    ((d?.name === "Bagagli" || d?.name === "Animale") &&
                      d?.maxWeight && (
                        <span>
                          {" "}
                          (Massimo Peso {d?.maxWeight}
                          {d?.unit})
                        </span>
                      ))}
                </strong>
                <h4>
                  {d?.carency}
                  {d?.cost}
                </h4>

                {((d?.name === "Adulti" || d?.name === "Bambini") && (
                  <span className={d?.discount && "dis"}>
                    {d?.discount}% Sconto
                  </span>
                )) ||
                  (d?.name === "Bagagli" && (
                    <span>Numero Bagagli {d?.count}</span>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
