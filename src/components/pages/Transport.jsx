import { useState } from "react";
import Button from "../basic/Button";
import ExportBtn from "../basic/ExportBtn";
import Filters from "../basic/Filters";
import Title from "../basic/Title";
import BookingMneu from "../booking/BookingMenu";
import AddTransport from "../transport/AddTransport";
import TransportBody from "../transport/TransportBody";

export default function Transport() {
  const menus = [{ name: "All" }, { name: "Recently Added" }];
  const [transportData, setTransportData] = useState({});
  const [addTransport, setAddTransport] = useState(false);
  const [add, isAdd] = useState(false);
  const [search, setSearch] = useState("");
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
          <BookingMneu menus={menus} />
          <Filters search={search} setSearch={setSearch} />
          <TransportBody
            search={search}
            setTransportData={setTransportData}
            handler={(e) => {
              setAddTransport(e);
              isAdd(false);
            }}
          />
          {/* <Pagenation isbrns={true} /> */}
        </div>
      </div>
    </div>
  );
}
