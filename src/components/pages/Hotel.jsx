import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import values from "../../../values";
import Button from "../basic/Button";
import ExportBtn from "../basic/ExportBtn";
import Filters from "../basic/Filters";
import Title from "../basic/Title";
import BookingMneu from "../booking/BookingMenu";
import Pagenation from "../booking/Pagenation";
import AddHotel from "../hotel/AddHotel";
import HotelItem from "../hotel/HotelItem";

export default function Hotel() {
  const [menus, setMenus] = useState([
    { name: "Tutti" },
    { name: "Recentemente Aggiunti" },
  ]);

  const [hotels, setHotels] = useState([]);
  const [addhotel, setAddhotel] = useState(false);

  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${values.url}/hotel`, {
          headers: {
            token,
          },
        });
        console.log(data);
        setHotels(data);
      } catch (error) {
        console.log(error);
        setHotels([]);
      }
    })();
  }, []);

  return (
    <div className="hotel">
      <AddHotel handler={setAddhotel} addhotel={addhotel} />
      <div className="container">
        <div className="booking-box">
          <div className="hotel-top">
            <div className="hotel-top-left">
              <Title title="Hotel Lish" />
              <p>Questa è la lista di tutti gli hotel aggiunti nel pannello</p>
            </div>
            <div className="hotel-top-right">
              <ExportBtn />
              <Button text="Aggiungi Hotel" handler={setAddhotel} />
            </div>
          </div>
          <BookingMneu menus={menus} />
          <Filters />
          <div className="hotel-wrp">
            {Array.isArray(hotels) &&
              hotels?.map((hotel, i) => (
                <HotelItem key={i} hotelData={hotel} />
              ))}
          </div>
          <Pagenation isbrns={true} />
        </div>
      </div>
    </div>
  );
}
