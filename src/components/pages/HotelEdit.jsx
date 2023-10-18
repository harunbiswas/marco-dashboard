import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BsFillBuildingsFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import values from "../../../values";
import { HotelContext, useHotelContext } from "../../context/hotel.context";
import Bootcump from "../basic/BootCump";
import Loading from "../basic/Loading";
import EditMenu from "../hotel-edit/EditMenu";
import EditOffer from "../hotel-edit/EditOffer";
import HotelDetailsForm from "../hotel-edit/HotelDetailsForm";
import LocationDetails from "../hotel-edit/LocationDetails";
import Publish from "../hotel-edit/Publish";

export default function HotelEdit() {
  const [isDelete, setIsDelete] = useState(false);
  const [active, setActive] = useState(1);
  const { isNewHotelAdding, setIsNewHotelAdding } =
    useHotelContext(HotelContext);
  const [isPublish, setIsPublish] = useState(false);
  const navigate = useNavigate();
  const [fixtData, setFixtData] = useState({});

  // development
  const { id } = useParams();
  const [hotelData, setHotelData] = useState({});
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  useEffect(() => {
    axios
      .get(`${values.url}/hotel/single?id=${id}`)
      .then((d) => {
        setFixtData(d.data);
        setHotelData(d.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  const [isLoading, setIsloading] = useState(false);
  const submitHandler = () => {
    setIsloading(true);
    axios
      .put(`${values.url}/hotel`, hotelData, {
        headers: {
          token,
        },
      })
      .then((d) => {
        setIsloading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsloading(false);
      });
  };
  const publishHandler = () => {
    hotelData.publish = true;
    axios
      .put(`${values.url}/hotel`, hotelData, {
        headers: {
          token,
        },
      })
      .then((d) => {})
      .catch((e) => console.log(e));
  };

  const handleDeleteBtn = async () => {
    if (isNewHotelAdding) {
      //Delete the hotel first
      try {
        const resp = await axios.delete(`${values.url}/hotel/${id}`, {
          headers: {
            token,
          },
        });
        console.log(resp);
        navigate("/hotel");
        setIsNewHotelAdding(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/hotel");
      setIsNewHotelAdding(false);
    }
  };

  const bootCump = ({ isNewHotelAdding }) => [
    {
      name: "Lista Hotel",
      url: "/hotel",
      icon: <BsFillBuildingsFill />,
    },
    {
      name:
        new Date(hotelData?.createdAt).getTime() ===
        new Date(hotelData?.updatedAt).getTime()
          ? "Aggiungi Hotel"
          : hotelData?.name,
    },
  ];

  return (
    <div className="hotel-edit hotel">
      <div className="container">
        <Bootcump data={bootCump(isNewHotelAdding)} />
        <div className="hotel-edit-wrp booking-box">
          <div className="hotel-edit-top">
            <EditMenu active={active} setActive={setActive} />
          </div>
          <div className="hotel-edit-body">
            {(active === 1 && (
              <HotelDetailsForm
                data={hotelData}
                fixtData={fixtData}
                setData={setHotelData}
              />
            )) ||
              (active === 2 && (
                <LocationDetails
                  fixtData={fixtData}
                  data={hotelData}
                  setData={setHotelData}
                />
              )) ||
              (active === 3 && (
                <EditOffer data={hotelData} setData={setHotelData} />
              )) ||
              (active === 4 && isPublish && <Publish />)}
          </div>

          <div className="hotel-edit-footer">
            <div className="left">
              <button onClick={() => setIsDelete(true)}>Annulla</button>
              {isDelete && (
                <div className="isdelete">
                  <h2 className="jakarta">Vuoi tornare indietro?</h2>
                  <p className="jakarta">
                    Perderai tutti i dati inseriti nella creazione dell’hotel
                  </p>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        setIsDelete(false);
                        // handler(true);
                      }}
                      className="btn"
                    >
                      Annulla
                    </button>
                    <button
                      onClick={handleDeleteBtn}
                      style={{ background: "red", color: "white" }}
                      className=" btn"
                    >
                      Torna Indietro
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="right rerpoiuqwer">
              {!isPublish &&
                new Date(hotelData?.createdAt).getTime() !==
                  new Date(hotelData?.updatedAt).getTime() &&
                ((isLoading && <Loading />) || (
                  <button onClick={submitHandler}>Salva Modifiche</button>
                ))}
              <button
                onClick={() => {
                  if (active === 4 && !isPublish) publishHandler();
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
                {(active === 4 && !isPublish && "Publish") || "Avanti"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
