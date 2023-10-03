import { useEffect, useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import AddBtn from "../booking/AddBtn";
import Filter from "../booking/Filter";
import Search from "./Search";
import Select from "./Select";

export default function Filters({
  activePage,
  search,
  setSearch,
  sortValue,
  setSortValue,
  filterOP,
  setFilterOP,
}) {
  const [isFilter, setIsFilter] = useState(false);
  const filter = useRef(null);

  const closeHandler = () => {
    setIsFilter(false);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (filter.current && !filter.current.contains(e.target)) {
        setIsFilter(false);
      }
    });
  }, []);

  return (
    <div className="booking-filter">
      <Search search={search} pls="Cerca" setSearch={setSearch} />
      <div className="booking-filters">
        {activePage && <AddBtn activePage={activePage} />}
        <div className="sort booking-btn transport-sort">
          <div className="icon">
            <HiMiniBars3BottomLeft />
          </div>

          <Select
            handler={(e) => {
              setSortValue(e);
            }}
            data={["Ordina per ultimi aggiunti", "Ordina per i più vecchi"]}
            activeValue={sortValue}
          />
        </div>
        <div ref={filter} className=" booking-btn filter-btn-wrp">
          <button
            onClick={() => {
              setIsFilter(!isFilter);
            }}
            className="filter-btn"
          >
            <div className="icon">
              <FiFilter />
            </div>

            <p>Filters</p>
            <span>{filterOP.car.length + filterOP.days.length}</span>
          </button>

          {isFilter && (
            <Filter
              filterOP={filterOP}
              setFilterOP={setFilterOP}
              handler={closeHandler}
            />
          )}
        </div>
        {/* <DateLine
          data={[
            "Today",
            " Last day",
            "Last 7 days",
            "Last Month",
            "Last Year",
          ]}
          defaultText="show:"
          icon={<BsCalendarEvent />}
        /> */}
      </div>
    </div>
  );
}
