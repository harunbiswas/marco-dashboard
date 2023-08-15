import { BsFillBuildingsFill } from "react-icons/bs";
import { LuEdit } from "react-icons/lu";
import { Link } from "react-router-dom";
import Bootcump from "../basic/BootCump";
import Rating from "../basic/Rating";
import Title from "../basic/Title";
import Description from "../hotel/Description";
import Tags from "../hotel/Tags";

export default function HotelDetails() {
  const bootcumpData = [
    {
      name: " Hotel Management",
      url: "/hotel",
      icon: <BsFillBuildingsFill />,
    },
    {
      name: "San Pietro di Positano",
    },
  ];

  const description = `Offering a private beach, fitness centre and a Michelin-starred restaurant, Il San Pietro di Positano is located in Positano. This luxurious 5-star hotel features elegantly furnished rooms with a terrace and sea views.
  
  The spacious rooms all include bathrobes, slippers and a flat-screen TV with satellite and pay-per-view channels. Some also feature a design sofa or chair.Offering a private beach, fitness centre and a Michelin-starred restaurant, Il San Pietro di Positano is located in Positano. This luxurious 5-star hotel features elegantly furnished rooms with a terrace and sea views.

  The spacious rooms all include bathrobes, slippers and a flat-screen TV with satellite and pay-per-view channels. Some also feature a design sofa or chair.Offering a private beach, fitness centre and a Michelin-starred restaurant, Il San Pietro di Positano is located in Positano. This luxurious 5-star hotel features elegantly furnished rooms with a terrace and sea views.

  The spacious rooms all include bathrobes, slippers and a flat-screen TV with satellite and pay-per-view channels. Some also feature a design sofa or chair.`;

  return (
    <div className="hotel hotel-details">
      <div className="container">
        <Bootcump data={bootcumpData} />
        <div className="hotel-details-wrp">
          <div className="basic">
            <div className="booking-box">
              <div className="hotel-details-top">
                <div className="images">
                  <div className="primary">
                    <img
                      className=""
                      src="https://cdn.pixabay.com/photo/2014/07/10/17/17/hotel-389256_640.jpg"
                      alt=""
                    />
                  </div>
                  <div className="secondary">
                    <img
                      src="https://cdn.pixabay.com/photo/2019/08/19/13/58/bed-4416515_640.jpg"
                      alt=""
                    />
                    <img
                      src="https://cdn.pixabay.com/photo/2016/04/15/11/48/hotel-1330850_640.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="info">
                  <div className="left">
                    <Title title="San Pietro di Positano" />
                    <Rating />
                  </div>
                  <div className="edit-btn">
                    <Link to="/">
                      <LuEdit /> Edit
                    </Link>
                  </div>
                </div>
                <Tags />
              </div>
              <Description description={description} title="Description" />
            </div>
          </div>
          <div className="booking-box hotel-details-offers">offers</div>
        </div>
      </div>
    </div>
  );
}
