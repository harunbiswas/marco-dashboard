import Select from "../basic/Select";
import Input from "./Input";

const engToItl = {
  "Select Board type": "Applicare a",
  "Age Limit": "Limite Età",
  Discount: "Sconto",
};

export default function AgeReduction({ data, handler }) {
  return (
    <div className="breakdown-inner">
      <div className="item">
        <label htmlFor="">Applicare a</label>
        <Select
          data={[
            "Tutti i tipi di pensione",
            "Pensione completa",
            "Mezza pensione",
            "Bed & Breakfast",
          ]}
          handler={(e) => handler(e, data.reductionId, "boardType")}
          activeValue={data.boardType || "Tutti i tipi di pensione"}
        />
      </div>
      <div className="item">
        <label htmlFor="">Età Massima</label>
        <Input
          type="number"
          handler={(e) => handler(e, data.reductionId, "agelimit")}
          d={{ value: data.agelimit, label: "Enter Limite Età" }}
        />
      </div>
      <div className="item klsajflkjsdfjlkklsadflkjsdf">
        <label htmlFor="">Sconto</label>
        <span>%</span>
        <Input
          type="number"
          handler={(e) => handler(e, data.reductionId, "discount")}
          d={{ value: data.discount, label: "Enter Sconto" }}
        />
      </div>
    </div>
  );
}
