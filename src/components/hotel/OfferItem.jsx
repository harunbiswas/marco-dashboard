import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import img from "../../assets/images/discount.svg";
import Description from "./Description";

export default function OfferItem() {
  const description = `
    Offering a private beach, fitness centre and a Michelin-starred restaurant, Il San Pietro di Positano is located in Positano. This luxurious 5-star hotel features elegantly furnished rooms with a terrace and sea views.Offering a private beach, fitness centre and a Michelin-starred restaurant, Il San Pietro di Positano is located in Positano. This luxurious 5-star hotel features elegantly furnished rooms with a terrace and sea views.Offering a private beach, fitness centre and a Michelin-starred restaurant, Il San Pietro di Positano is located in Positano. This luxurious 5-star hotel features elegantly furnished rooms with a terrace and sea views.`;
  return (
    <div className="offer-item">
      <div className="offer-item-top">
        <div className="offer-item-top-left">
          <img src={img} alt="" />
          <div className="content">
            <h4>Summer Offer</h4>
            <span>From 01 june - 30 August</span>
          </div>
        </div>
        <div className="toggle">
          <button>{<FaAngleDown /> || <FaAngleUp />}</button>
        </div>
      </div>
      <div className="offer-item-body">
        <Description description={description} max={20} />
        <div className="conditions">
          <h4>Conditions</h4>
          <ul className="conditions-wrp">
            <li>&#x2713; Minimum 2 Nights </li>
            <li>&#x2713; Minimum 7 Nights </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
