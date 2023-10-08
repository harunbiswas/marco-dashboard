import { useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { ImGlass } from "react-icons/im";
import img from "../../assets/images/discount.svg";
import Description from "./Description";
import OfferTags from "./OfferTags";
import moment from "moment/moment";

export default function OfferItem({ editOfferHandler, offer }) {
  const description = `
    Offering a private beach, fitness centre and a Michelin-starred restaurant, Il San Pietro di Positano is located in Positano. This luxurious 5-star hotel features elegantly furnished rooms with a terrace and sea views.Offering a private beach, fitness centre and a Michelin-starred restaurant, Il San Pietro di Positano is located in Positano. This luxurious 5-star hotel features elegantly furnished rooms with a terrace and sea views.Offering a private beach, fitness centre and a Michelin-starred restaurant, Il San Pietro di Positano is located in Positano. This luxurious 5-star hotel features elegantly furnished rooms with a terrace and sea views.`;

  const [prices, setPrices] = useState([
    {
      name: "Full Board",
      price: 120,
      dateline: "per night",
    },
    {
      name: "Half Board",
      price: 90,
      dateline: "per night",
    },
    {
      name: "Bread & Breakfast",
      price: 140,
      dateline: "per night",
    },
  ]);

  const body = useRef(null);
  const [istoggle, setIsToggle] = useState(false);
  const [isTagEdit, setIsTagEdit] = useState(false);

  return (
    <div className="offer-item">
      <div onClick={() => setIsToggle(!istoggle)} className="offer-item-top">
        <div className="offer-item-top-left">
          <img src={img} alt="" />
          <div className="content">
            <h4>{offer.name}</h4>
            <span>
              Dal {moment(offer.startDate).format("Do MMMM ")} -{" "}
              {moment(offer.endDate).format("Do MMMM YY")}
            </span>
          </div>
        </div>
        <div className="toggle">
          <button>{(!istoggle && <FaAngleDown />) || <FaAngleUp />}</button>
        </div>
      </div>
      <div className={`offer-item-body ${(istoggle && "show") || ""}`}>
        <Description description={offer.description} max={20} />
        <div className="conditions">
          <h4>Conditions</h4>
          <ul className="conditions-wrp">
            <li>&#x2713; Minimo {offer.minStay} Notti </li>
            <li>&#x2713; Massimo {offer.maxStay} Notti </li>
          </ul>
        </div>
        <div className="conditions">
          <h4>
            <ImGlass />
            {offer.beverageAvailability === "Incluse"
              ? "Bevande Incluse"
              : "Bevande non Incluse"}
          </h4>
        </div>

        <div className="price">
          <h4>Price</h4>
          <ul className="price-items">
            {offer.breakdown.map((pr, i) => (
              <li key={i}>
                <p>{pr.name}</p>
                <strong>
                  {pr.currency + pr.price} <span>/{pr.priceType}</span>
                </strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="offer-item-tags">
          <h4>Tags</h4>
          <OfferTags isTagEdit={isTagEdit} />
        </div>
        <div className="buttons">
          <button className="delete">Delete</button>
          <button onClick={() => editOfferHandler(true)}>Edit Offer</button>
        </div>
      </div>
    </div>
  );
}
