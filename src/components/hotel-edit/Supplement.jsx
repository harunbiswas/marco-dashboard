import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import Input from "./Input";

export default function Supplement({ supplement, setSupplement }) {
  return (
    <div className="add-new-offer-details supplement">
      {supplement?.map((d, i) => (
        <div key={i} className="item-wrp">
          <div className="item">
            <label htmlFor="Massimo notti">Supplemento {i + 1}</label>

            <Input
              type="text"
              handler={(e) => {
                setSupplement((prevValues) =>
                  prevValues.map((value, j) => (i === j ? e : value))
                );
              }}
              d={{ value: d }}
            />
          </div>
          <button
            onClick={() => {
              setSupplement((prevValues) =>
                prevValues.filter((value, j) => i !== j)
              );
            }}
          >
            <AiOutlineDelete />
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          setSupplement((prev) => {
            return [...prev, ""];
          });
        }}
      >
        <AiOutlinePlus /> Aggiungi Supplemento
      </button>
    </div>
  );
}
