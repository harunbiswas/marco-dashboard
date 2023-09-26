import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BsFillBuildingsFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import values from "../../../values";
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
  const navigate = useNavigate();

  // development
  const { id } = useParams();
  const [hotelData, setHotelData] = useState({});
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  useEffect(() => {
    axios
      .get(`${values.url}/hotel/single?id=${id}`)
      .then((d) => {
        setHotelData(d.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  const submitHandler = () => {
    axios
      .put(`${values.url}/hotel`, hotelData, {
        headers: {
          token,
        },
      })
      .then((d) => console.log(d))
      .catch((e) => console.log(e));
  };

  return (
    <div className="hotel-edit hotel">
      <div className="container">
        <Bootcump data={bootCump} />
        <div className="hotel-edit-wrp booking-box">
          <div className="hotel-edit-top">
            <EditMenu active={active} setActive={setActive} />
          </div>
          <div className="hotel-edit-body">
            {(active === 1 && (
              <HotelDetailsForm data={hotelData} setData={setHotelData} />
            )) ||
              (active === 2 && <LocationDetails />) ||
              (active === 3 && <EditOffer />) ||
              (active === 4 && isPublish && <Publish />)}
          </div>

          <div className="hotel-edit-footer">
            <div className="left">
              <button>Discard</button>
            </div>
            <div className="right">
              {!isPublish && (
                <button onClick={submitHandler}>Save Changes</button>
              )}
              <button
                onClick={() => {
                  if (active < 4 && !isPublish) {
                    setActive(active + 1);
                  } else if (isPublish) {
                    navigate("/hotel");
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
