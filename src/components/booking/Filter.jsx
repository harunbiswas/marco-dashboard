import values from "../../../values";
import FilterItem from "./filterItem";

export default function Filter({ handler, filterOP, setFilterOP }) {
  return (
    <div className="filter">
      <div className="filter-top">
        <div className="name">
          <p>Filtri</p>
          <span>2</span>
        </div>
      </div>
      <div className="filter-body">
        {values.filterData.map((item, i) => (
          <FilterItem
            filterOP={filterOP}
            setFilterOP={setFilterOP}
            key={i}
            index={i}
            data={item}
          />
        ))}
      </div>

      <div className="filter-btns">
        <button onClick={() => handler(false)} className="cancel">
          Annulla
        </button>
        <button onClick={() => handler(false)} className="apply">
          Apply
        </button>
      </div>
    </div>
  );
}
