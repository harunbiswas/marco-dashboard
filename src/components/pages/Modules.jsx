import { useState } from "react";
import Button from "../basic/Button";
import ExportBtn from "../basic/ExportBtn";
import Filters from "../basic/Filters";
import Title from "../basic/Title";
import BookingMneu from "../booking/BookingMenu";
import Pagenation from "../booking/Pagenation";
import AddModule from "../module/AddModule";
import ModuleDetils from "../module/ModuleDetails";
import ModuleTable from "../module/ModuleTable";

export default function Modules() {
  const menus = [{ name: "Tutti" }, { name: "Recentemente Aggiunti" }];
  const [isDetails, setIsDetails] = useState(false);
  const [isIndex, setIsIndex] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [active, setActive] = useState("");
  const [addModule, setAddModule] = useState(false);

  return (
    <div className="module hotel">
      <AddModule handler={setAddModule} addhotel={addModule} />
      {isDetails && <ModuleDetils handler={setIsDetails} addhotel={false} />}
      <div className="container">
        <div className="booking-box">
          <div className="hotel-top">
            <div className="hotel-top-left">
              <Title title="Moduli" />
              <p>Questa è la lista di tutti i moduli aggiunti nel pannello</p>
            </div>
            <div className="hotel-top-right">
              <ExportBtn />
              <Button handler={setAddModule} text="Nuovo Modulo" />
            </div>
          </div>
          <BookingMneu setActive={setActive} menus={menus} />
          <Filters search={searchData} setSearch={setSearchData} />
          <div className="module-table-wrp">
            <ModuleTable
              active={active}
              searchData={searchData}
              data={{
                detailsHandler: setIsDetails,
                isIndex: isIndex,
                setIsIndex,
                isDetails,
              }}
            />
          </div>

          <Pagenation />
        </div>
      </div>
    </div>
  );
}
