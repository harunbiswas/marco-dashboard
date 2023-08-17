import { useState } from "react";
import { BsFillBuildingsFill, BsPlusLg } from "react-icons/bs";
import { FaUmbrellaBeach } from "react-icons/fa";
import Bootcump from "../basic/BootCump";
import Rating from "../basic/Rating";
import Search from "../basic/Search";
import Title from "../basic/Title";
import Description from "../hotel/Description";
import EditBtn from "../hotel/EditBtn";
import Map from "../hotel/Map";
import OfferItem from "../hotel/OfferItem";
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

  const [serviceItems, setServiceItems] = useState([
    { icon: <FaUmbrellaBeach />, name: "On private beach" },
    { icon: <FaUmbrellaBeach />, name: "Spa" },
    { icon: <FaUmbrellaBeach />, name: "Pool" },
    { icon: <FaUmbrellaBeach />, name: "Parking included" },
    { icon: <FaUmbrellaBeach />, name: "Breakfast included" },
    { icon: <FaUmbrellaBeach />, name: "Free Wifi" },
  ]);

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
                  <EditBtn />
                </div>
                <Tags />
              </div>
              <div className="hotel-details-des">
                <Description description={description} title="Description" />
              </div>
            </div>
            <div className="booking-box hotel-details-service">
              <div className="hotel-details-service-top">
                <h4>Services</h4>
                <EditBtn />
              </div>
              <div className="hotel-details-service-body">
                <ul className="hotel-details-service-body-items">
                  {serviceItems.map((item, i) => (
                    <li key={i}>
                      {item.icon} {item.name}
                    </li>
                  ))}
                </ul>
                <div className="hotel-details-des">
                  <Description max={30} description={description} />
                </div>
              </div>
            </div>
            <div className="booking-box hotel-details-location">
              <div className="hotel-details-location-top">
                <h4>Location</h4>
                <EditBtn />
              </div>
              <Map />
            </div>
          </div>
          <div className="booking-box hotel-details-offers">
            <div className="hotel-details-offers-top">
              <Title title="Hotel offers" />
              <button className="add-new">
                <BsPlusLg />
              </button>
            </div>
            <Search />
            <div className="hotel-details-offers-body">
              <OfferItem />
              <OfferItem />
              <OfferItem />
              <OfferItem />
              <OfferItem />
              <OfferItem />
              <OfferItem />
              <OfferItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
