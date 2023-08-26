import { useState } from "react";
import { BsFillBuildingsFill } from "react-icons/bs";
import Bootcump from "../basic/BootCump";
import EditMenu from "../hotel-edit/EditMenu";
import EditOffer from "../hotel-edit/EditOffer";
import HotelDetailsForm from "../hotel-edit/HotelDetailsForm";
import LocationDetails from "../hotel-edit/LocationDetails";
import Publish from "../hotel-edit/Publish";

export default function HotelEdit() {
  const bootCump = [
    {
      name: "Hotel Management",
      url: "/hotel",
      icon: <BsFillBuildingsFill />,
    },
    {
      name: "Add New Hotel",
    },
  ];

  const [active, setActive] = useState(1);
  const [isPublish, setIsPublish] = useState(false);

  return (
    <div className="hotel-edit hotel">
      <div className="container">
        <Bootcump data={bootCump} />
        <div className="hotel-edit-wrp booking-box">
          <div className="hotel-edit-top">
            <EditMenu active={active} setActive={setActive} />
          </div>
          <div className="hotel-edit-body">
            {(active === 1 && <HotelDetailsForm />) ||
              (active === 2 && <LocationDetails />) ||
              (active === 3 && <EditOffer />) ||
              (active === 4 && isPublish && <Publish />)}
          </div>

          <div className="hotel-edit-footer">
            <div className="left">
              <button>Discard</button>
            </div>
            <div className="right">
              {!isPublish && <button>Save Changes</button>}
              <button
                onClick={() => {
                  if (active < 4 && !isPublish) {
                    setActive(active + 1);
                  } else {
                    setIsPublish(true);
                  }
                }}
                className="submit"
              >
                {(active === 4 && !isPublish && "Publish") || "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
