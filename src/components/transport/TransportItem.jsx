import moment from "moment";
import "moment/locale/it";
import { useEffect, useState } from "react";
import {
  BiEdit,
  BiSolidDollarCircle,
  BiSolidLocationPlus,
} from "react-icons/bi";
import { FaCarSide, FaShip } from "react-icons/fa";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { TbTrain } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function TransportItem({ handler, data, setTransportData }) {
  const [prics, setPrics] = useState([]);

  useEffect(() => {
    moment.locale("it"); // Set the locale
  }, []);

  const options = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
    localeMatcher: "best fit",
  };

  const nameOrder = {
    Adulti: 1,
    Bambini: 2,
    Bagagli: 3,
    Animale: 4,
  };

  const [isDetails, setIsDetails] = useState(false);
  const formattedDate = (value) =>
    new Intl.DateTimeFormat("it-IT", options).format(value);

  useEffect(() => {
    setPrics(data?.pricing.sort((a, b) => a?.age - b?.age));
  }, [data]);

  console.log(data);
  return (
    <div className="item">
      <div className="item-top-wrp">
        <div className={`item-top ${isDetails && "bg-grey"}`}>
          <div className="content">
            <strong>{data?.name}</strong>
            <span>
              {data?.startingDate &&
                formattedDate(new Date(data?.startingDate))}
              -{data?.endingDate && formattedDate(new Date(data?.endingDate))}
            </span>
          </div>

          <div className="right">
            {isDetails && (
              <Link
                onClick={() => {
                  setIsDetails(false);
                }}
                to=""
              >
                Chiudi Dettagli
              </Link>
            )}

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
        </div>
        {!isDetails && (
          <div className="item-bottom">
            <span>
              {(data?.vehicleType === "Aereo" && <PiAirplaneTakeoffFill />) ||
                (data?.vehicleType === "Treno" && <TbTrain />) ||
                (data?.vehicleType === "Bus" && <FaCarSide />) ||
                (data?.vehicleType === "Nave" && <FaShip />)}
              {data?.vehicleType}
            </span>
            <span>
              <BiSolidLocationPlus /> {data?.state} {data?.city} {data?.zip}
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
                {data?.state} {data?.city} {data?.zip}
              </strong>
            </div>
          </div>
        </div>
        <div className="item-body-item">
          <div className="item-body-item-inner">
            <div className="icon">
              {(data?.vehicleType === "Aereo" && <PiAirplaneTakeoffFill />) ||
                (data?.vehicleType === "Treno" && <TbTrain />) ||
                (data?.vehicleType === "Bus" && <FaCarSide />) ||
                (data?.vehicleType === "Nave" && <FaShip />)}
            </div>
            <div className="content">
              <span>Tipo di Veicolo</span>
              <strong>{data?.vehicleType}</strong>
            </div>
          </div>
          <div className="item-body-item-inner">
            <div className="icon">
              {(data?.vehicleType === "Aereo" && <PiAirplaneTakeoffFill />) ||
                (data?.vehicleType === "Treno" && <TbTrain />) ||
                (data?.vehicleType === "Bus" && <FaCarSide />) ||
                (data?.vehicleType === "Nave" && <FaShip />)}
            </div>
            <div className="content">
              <span>Marchio</span>
              <strong>{data?.vehicleBrand}</strong>
            </div>
          </div>
        </div>
        <div className="item-body-item">
          <div className="item-body-item-inner">
            <div className="icon">
              <SlCalender />
            </div>
            <div className="content">
              <span>Periodo di Validità</span>
              <strong>
                {" "}
                {data?.startingDate &&
                  formattedDate(new Date(data?.startingDate))}
                -{data?.endingDate && formattedDate(new Date(data?.endingDate))}
              </strong>
            </div>
          </div>
          <div className="item-body-item-inner">
            <div className="icon">
              <SlCalender />
            </div>
            <div className="content">
              <span>Giorni Validi</span>
              <div className="days">
                {data?.days.map((d, i) => (
                  <strong key={i}>
                    {d}
                    {(i === data.days.length - 2 && " and") ||
                      (i === data.days.length - 1 && " ") ||
                      ","}
                  </strong>
                ))}
              </div>
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
            {prics
              ?.sort((a, b) => nameOrder[a.name] - nameOrder[b.name])
              .map((d, i) => (
                <div
                  className={`item ${
                    (d?.name === "Adulti" && "disc") ||
                    (d?.name === "Bambini" && "bam") ||
                    (d?.name === "Animale" && "ani")
                  }`}
                  key={i}
                >
                  <strong>
                    {d?.name}
                    {(d?.name === "Bambini" && (
                      <span>
                        {" "}
                        (Età
                        {(d?.age <= 5 && "0-5") ||
                          (d?.age <= 7 && "6-7") ||
                          (d?.age <= 9 && "8-9") ||
                          (d?.age <= 13 && "10-13") ||
                          (d?.age <= 15 && "14-15") ||
                          (d?.age <= 18 && "16-18")}
                        )
                      </span>
                    )) ||
                      ((d?.name === "Bagagli" || d?.name === "Animale") &&
                        d?.maxWeight && (
                          <span>
                            {" "}
                            (Massimo Peso {d?.maxWeight}
                            {d?.unit})
                          </span>
                        )) ||
                      ""}
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
