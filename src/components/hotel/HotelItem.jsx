import { MdLocationOn } from "react-icons/md";
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
import Rating from "../basic/Rating";
import Offers from "./Offers";
import Tags from "./Tags";

export default function HotelItem() {
  return (
    <div className="hotel-item">
      <div className="hotel-item-left">
        <div className="img">
          <img
            src="https://cdn.pixabay.com/photo/2021/08/27/01/33/bedroom-6577523_1280.jpg"
            alt=""
          />
        </div>
        <div className="info">
          <div className="top">
            <h4>San Pietro di Positano</h4>
            <Rating />
          </div>
          <p>
            <span>
              <MdLocationOn /> Via Laurito, 2, 80017 Positano, Italy
            </span>

            <span>
              <RxDotFilled />
              1.7 km from centre
            </span>
          </p>
          <Tags />
          <Offers />
        </div>
      </div>
      <div className="hotel-item-right">
        <div className="hotel-item-right-top">
          <span>Starting form</span>
          <strong>$590~$5000</strong>
        </div>
        <div className="hotel-item-right-bottom">
          <Link to="/" className="btn">
            Vies details
          </Link>
        </div>
      </div>
    </div>
  );
}
