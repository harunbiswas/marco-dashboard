import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import img from "../../assets/images/discount.svg";

export default function Offers() {
  const [offers, setOffers] = useState([
    {
      name: "Summer Offer",
      date: "From 01 June - 30 August",
    },
    {
      name: "HoEscape Offer",
      date: "From 01 June - 30 August",
    },
    {
      name: "20% Discount Offer",
      date: "From 01 June - 30 August",
    },
  ]);
  return (
    <>
      <ul className="offers">
        {offers.map((d, i) => (
          <li className="offers-item" key={i}>
            <div className="offers-item-left">
              <img src={img} alt="" />
            </div>
            <div className="offers-item-right">
              <h5>{d.name}</h5>
              <p>{d.date}</p>
            </div>
          </li>
        ))}
      </ul>
      <button className="offers-btn">
        <FaAngleRight />
      </button>
    </>
  );
}
