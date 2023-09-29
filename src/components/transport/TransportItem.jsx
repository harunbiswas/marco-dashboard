import { useState } from "react";
import {
  BiEdit,
  BiSolidDollarCircle,
  BiSolidLocationPlus,
} from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TransportItem({ handler }) {
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

  const [isDetails, setIsDetails] = useState(false);
  return (
    <div className="item">
      <div className="item-top-wrp">
        <div className={`item-top ${isDetails && "bg-grey"}`}>
          <div className="content">
            <strong>Edino v3</strong>
            <span>13 July - 03 August 2023</span>
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
            {(!isDetails && "Vedi Dettagli") || "Edit Template"}
          </Link>
        </div>
        {!isDetails && (
          <div className="item-bottom">
            <span>
              <FaCarSide /> Train + Bus
            </span>
            <span>
              <BiSolidLocationPlus /> Campo Santa Maria Del Giglio, 2467, 30124
              Venezia VE
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
              <span>Starting Point</span>
              <strong>
                Campo Santa Maria Del Giglio, 2467, 30124 Venezia VE
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
              <span>Vehicle Type</span>
              <strong>Train + Bus</strong>
            </div>
          </div>{" "}
          <div className="item-body-item-inner">
            <div className="icon">
              <FaCarSide />
            </div>
            <div className="content">
              <span>Vehicle Brand</span>
              <strong>Toyota - Deluxe</strong>
            </div>
          </div>
        </div>

        <div className="item-body-item catagory">
          <div className="item-body-item-inner">
            <div className="icon">
              <BiSolidDollarCircle />
            </div>
            <div className="content">
              <span>Pricing by Catagory</span>
            </div>
          </div>
          <div className="item-body-item-pricing">
            {prics.map((d, i) => (
              <div className={`item ${d.discount && "disc"}`} key={i}>
                <strong>
                  {d.naem} <span>({d.tag})</span>
                </strong>
                <h4>${d.price}</h4>
                <span className={d.discount && "dis"}>
                  {(d.discount && d.discount + "% Discount") ||
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
