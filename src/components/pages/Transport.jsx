import { useState } from "react";
import Button from "../basic/Button";
import Filters from "../basic/Filters";
import Title from "../basic/Title";
import BookingMneu from "../booking/BookingMenu";
import Pagenation from "../booking/Pagenation";
import AddTransport from "../transport/AddTransport";
import TransportBody from "../transport/TransportBody";

export default function Transport() {
  const menus = [
    { name: "Tutti" },
    { name: "Recentemente Aggiunti" },
    { name: "Scaduti" },
  ];
  const [transportData, setTransportData] = useState({});
  const [addTransport, setAddTransport] = useState(false);
  const [add, isAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [isDup, setIsDup] = useState(false);

  const [maxVlaue, setMaxValue] = useState(0);
  const [activeVlaue, setActiveValue] = useState();
  const [activeMenu, setActiveMenu] = useState(false);
  const [sortValue, setSortValue] = useState("Ordina per ultimi aggiunti");
  const [filterOP, setFilterOP] = useState({
    car: [],
    days: [],
  });

  return (
    <div className="module hotel transport">
      <AddTransport
        add={add}
        handler={setAddTransport}
        addhotel={addTransport}
        transportData={(!add && transportData) || null}
        isDup={isDup}
      />
      <div className="container">
        <div className="booking-box">
          <div className="hotel-top">
            <div className="hotel-top-left">
              <Title title="Lista Trasporti" />
              <p>
                Questa è la lista di tutti i trasporti aggiunti nel pannello
              </p>
            </div>
            <div className="hotel-top-right">
              {/* <ExportBtn /> */}
              <Button
                handler={(e) => {
                  setAddTransport(e);
                  isAdd(true);
                  setIsDup(false);
                }}
                text="Aggiungi Trasporto"
              />
            </div>
          </div>
          <BookingMneu setActive={setActiveMenu} menus={menus} />
          <Filters
            filterOP={filterOP}
            setFilterOP={setFilterOP}
            sortValue={sortValue}
            setSortValue={setSortValue}
            search={search}
            setSearch={setSearch}
          />
          <TransportBody
            activeMenu={activeMenu}
            search={search}
            setTransportData={setTransportData}
            activePage={activeVlaue}
            setMaxValue={setMaxValue}
            sortValue={sortValue}
            handler={(e) => {
              setAddTransport(e);
              isAdd(false);
            }}
            filterOP={filterOP}
            setIsDup={setIsDup}
          />
          <Pagenation
            isbrns={true}
            active={activeVlaue}
            max={maxVlaue}
            setActiveValue={setActiveValue}
          />
        </div>
      </div>
    </div>
  );
}
