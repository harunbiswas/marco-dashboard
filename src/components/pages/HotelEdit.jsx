import { useState } from "react";
import { BiSwim } from "react-icons/bi";
import { BsFillBuildingsFill } from "react-icons/bs";
import Bootcump from "../basic/BootCump";
import EditMenu from "../hotel-edit/EditMenu";
import HotelDetailsForm from "../hotel-edit/HotelDetailsForm";
import TagInput from "../hotel-edit/TagInput";

export default function HotelEdit() {
  const bootCump = [
    {
      name: "Hotel Management",
      url: "/hotel",
      icon: <BsFillBuildingsFill />,
    },
    {
      name: "Add New Hotel",
      url: "/hotel/12",
    },
    {
      name: "San Pietro di Positano",
    },
  ];
  const [include, setInclude] = useState([
    {
      icon: <BiSwim />,
      name: "Private beach",
    },
    {
      icon: <BiSwim />,
      name: "Pool",
    },
    {
      icon: <BiSwim />,
      name: "Spa",
    },
    {
      icon: <BiSwim />,
      name: "Parking included",
    },
    {
      icon: <BiSwim />,
      name: "free wifi",
    },
  ]);

  return (
    <div className="hotel-edit hotel">
      <div className="container">
        <Bootcump data={bootCump} />
        <div className="hotel-edit-wrp booking-box">
          <div className="hotel-edit-top">
            <EditMenu />
          </div>
          <div className="hotel-edit-body">
            <HotelDetailsForm />
          </div>
          <div className="hotel-edit-bottom">
            <h4>Service Included</h4>
            <TagInput data={include} />
            <h4>Strengths</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
