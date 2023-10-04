import { useEffect, useState } from "react";
import values from "../../../values";
import FilterItem from "./filterItem";

export default function Filter({ handler, filterOP, setFilterOP }) {
  const [filterOPTem, setFilterOPTem] = useState({
    car: [],
    days: [],
  });

  useEffect(() => {
    setFilterOPTem(filterOP);
  }, [filterOP]);

  return (
    <div className="filter">
      <div className="filter-top">
        <div className="name">
          <p>Filtri</p>
          <span>{filterOPTem?.car?.length + filterOPTem?.days?.length}</span>
        </div>
        <button
          style={{ textDecoration: "none" }}
          onClick={() => {
            setFilterOP({
              car: [],
              days: [],
            });
          }}
        >
          Disattiva tutti
        </button>
      </div>
      <div className="filter-body">
        {values.filterData.map((item, i) => (
          <FilterItem
            filterOP={filterOPTem}
            setFilterOP={setFilterOPTem}
            key={i}
            index={i}
            data={item}
          />
        ))}
      </div>

      <div className="filter-btns">
        <button
          onClick={() => {
            handler(false);
            setFilterOPTem(filterOP);
          }}
          className="cancel"
        >
          Annulla
        </button>
        <button
          onClick={() => {
            handler(false);
            setFilterOP(filterOPTem);
          }}
          className="apply"
        >
          Applica
        </button>
      </div>
    </div>
  );
}
