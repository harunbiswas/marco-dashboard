import { useState } from "react";
import Button from "../basic/Button";
import ExportBtn from "../basic/ExportBtn";
import Filters from "../basic/Filters";
import Title from "../basic/Title";
import BookingMneu from "../booking/BookingMenu";
import Pagenation from "../booking/Pagenation";
import AddTransport from "../transport/AddTransport";
import TransportBody from "../transport/TransportBody";

export default function Transport() {
  const menus = [{ name: "Tutti" }, { name: "Recentemente Aggiunti" }];
  const [transportData, setTransportData] = useState({});
  const [addTransport, setAddTransport] = useState(false);
  const [add, isAdd] = useState(false);
  const [search, setSearch] = useState("");

  const [maxVlaue, setMaxValue] = useState(0);
  const [activeVlaue, setActiveValue] = useState();
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <div className="module hotel">
      <AddTransport
        add={add}
        handler={setAddTransport}
        addhotel={addTransport}
        transportData={(!add && transportData) || null}
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
              <ExportBtn />
              <Button
                handler={(e) => {
                  setAddTransport(e);
                  isAdd(true);
                }}
                text="Aggiungi Trasporto"
              />
            </div>
          </div>
          <BookingMneu setActive={setActiveMenu} menus={menus} />
          <Filters search={search} setSearch={setSearch} />
          <TransportBody
            activeMenu={activeMenu}
            search={search}
            setTransportData={setTransportData}
            activePage={activeVlaue}
            setMaxValue={setMaxValue}
            handler={(e) => {
              setAddTransport(e);
              isAdd(false);
            }}
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
