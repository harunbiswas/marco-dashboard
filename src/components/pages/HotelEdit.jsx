import { BsFillBuildingsFill } from "react-icons/bs";
import Bootcump from "../basic/BootCump";
import EditMenu from "../hotel-edit/EditMenu";
import EditOffer from "../hotel-edit/EditOffer";
import HotelDetailsForm from "../hotel-edit/HotelDetailsForm";
import LocationDetails from "../hotel-edit/LocationDetails";

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

  return (
    <div className="hotel-edit hotel">
      <div className="container">
        <Bootcump data={bootCump} />
        <div className="hotel-edit-wrp booking-box">
          <div className="hotel-edit-top">
            <EditMenu />
          </div>
          <div className="hotel-edit-body">
            {(false && <HotelDetailsForm />) ||
              (false && <LocationDetails />) || <EditOffer />}
          </div>

          <div className="hotel-edit-footer">
            <div className="left">
              <button>Discard</button>
            </div>
            <div className="right">
              <button>Save Changes</button>
              <button className="submit">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
