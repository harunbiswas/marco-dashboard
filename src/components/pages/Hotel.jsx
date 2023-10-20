import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import values from "../../../values";
import Button from "../basic/Button";
import ExportBtn from "../basic/ExportBtn";
import Filters from "../basic/Filters";
import Loading from "../basic/Loading";
import Title from "../basic/Title";
import BookingMneu from "../booking/BookingMenu";
import Pagenation from "../booking/Pagenation";
import AddHotel from "../hotel/AddHotel";
import HotelItem from "../hotel/HotelItem";

export default function Hotel() {
  const [menus, setMenus] = useState([
    { name: "Tutti" },
    { name: "Recentemente Aggiunti" },
    { name: "Disabilita" },
  ]);

  const [hotels, setHotels] = useState([]);
  const [addhotel, setAddhotel] = useState(false);

  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;
  const [isLoading, setIsloading] = useState(false);

  // development
  const [week, setIsWeek] = useState("");
  const [max, setMax] = useState("");
  const [active, setActive] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsloading(true);

    (async () => {
      try {
        const { data } = await axios.get(
          `${values.url}/hotel?page=${active || 1}&search=${
            search || ""
          }&week=${
            (week === "Recentemente Aggiunti" && true) ||
            (week === "Disabilita" && "Disabilita") ||
            false
          }`,
          {
            headers: {
              token,
            },
          }
        );

        setMax(data.count);
        setHotels(data.result);
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        console.log(error);
        setHotels([]);
      }
    })();
  }, [search, active, week]);

  useEffect(() => {
    const xmlUrl = "https://www.goischia.it/source_xml/1615896594.xml";

    axios
      .get(xmlUrl)
      .then((response) => {
        // 'response.data' will contain the XML content
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="hotel">
      <AddHotel handler={setAddhotel} addhotel={addhotel} />
      <div className="container">
        <div className="booking-box">
          <div className="hotel-top">
            <div className="hotel-top-left">
              <Title title="Lista Hotel" />
              <p>Questa è la lista di tutti gli hotel aggiunti nel pannello</p>
            </div>
            <div className="hotel-top-right">
              <ExportBtn />
              <Button text="Aggiungi Hotel" handler={setAddhotel} />
            </div>
          </div>
          <BookingMneu menus={menus} setActive={setIsWeek} />
          <Filters
            pls="Cerca Hotel o $Offerte"
            search={search}
            setSearch={setSearch}
          />
          {(isLoading && <Loading />) || (
            <div className="hotel-wrp">
              {Array.isArray(hotels) &&
                hotels?.map((hotel, i) => (
                  <HotelItem key={i} hotelData={hotel} />
                ))}
            </div>
          )}

          <Pagenation
            isbrns={true}
            max={max}
            active={active}
            setActiveValue={setActive}
            search={search}
            showItem={10}
            btn={week}
          />
        </div>
      </div>
    </div>
  );
}
