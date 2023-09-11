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
  const menus = [{ name: "All" }, { name: "Recently Added" }];

  const [addTransport, setAddTransport] = useState(false);
  return (
    <div className="module hotel">
      <AddTransport handler={setAddTransport} addhotel={addTransport} />
      <div className="container">
        <div className="booking-box">
          <div className="hotel-top">
            <div className="hotel-top-left">
              <Title title="Hotel Lish" />
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece
              </p>
            </div>
            <div className="hotel-top-right">
              <ExportBtn />
              <Button handler={setAddTransport} text="Add New Transport" />
            </div>
          </div>
          <BookingMneu menus={menus} />
          <Filters />
          <TransportBody handler={setAddTransport} />
          <Pagenation isbrns={true} />
        </div>
      </div>
    </div>
  );
}
