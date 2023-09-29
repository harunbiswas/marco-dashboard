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

export default function TransportItem({ handler, data }) {
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

  console.log(data.pricing);
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
            {data?.pricing.map((d, i) => (
              <div
                className={`item ${
                  (d?.items[1]?.name === "Sconto" && "disc") ||
                  (d?.items[2]?.name === "Sconto" && "disc")
                }`}
                key={i}
              >
                <strong>
                  {d?.items[0]?.activeValue}
                  <span> ({d?.items[1]?.name + d?.items[1]?.value})</span>
                </strong>
                <h4>
                  {(d?.items[3] && d?.items[3]?.activeValue) ||
                    d?.items[2]?.activeValue}
                  {(d?.items[3] && d?.items[3]?.value) || d?.items[2]?.value}
                </h4>
                <span
                  className={
                    (d?.items[1]?.name === "Sconto" && "dis") ||
                    (d?.items[2]?.name === "Sconto" && "dis")
                  }
                >
                  {(d?.items[1]?.name === "Sconto" &&
                    d?.items[1]?.value + "% Sconto") ||
                    (d?.items[2]?.name === "Sconto" &&
                      d?.items[2]?.value + "% Sconto") ||
                    (d.max && "Maximum " + d.max)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
