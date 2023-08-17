import { BiPlus } from "react-icons/bi";
import DetailsImgs from "./DetailsImgs";
import DetailsInputs from "./DetailsInputs";
import Rating from "./Rating";
import TextArea from "./TextArea";

export default function HotelDetailsForm() {
  return (
    <from className="hotel-details-form">
      <div className="images">
        <h4>Hotel Images</h4>
        <p>
          Add 2 or more images of the hotel to give the customer a better
          experience
        </p>
        <DetailsImgs />
      </div>
      <div className="hotel-form-details">
        <h4>Hotel Details</h4>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical
        </p>

        <DetailsInputs />
        <div className="buttons">
          <a href="">
            <BiPlus />
            Add Spa Description
          </a>
          <a href="">
            <BiPlus />
            Add Restaurants Description
          </a>
        </div>
      </div>
      <div className="hotel-details-form-rating">
        <h4>Hotel Raring</h4>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical
        </p>
        <Rating />
      </div>

      <div className="service">
        <h4>Service Details</h4>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical
        </p>
        <div className="hotel-form-details-item full">
          <label htmlFor="">Service Details</label>
          <div className="inner">
            <TextArea />
          </div>
        </div>
      </div>
    </from>
  );
}
