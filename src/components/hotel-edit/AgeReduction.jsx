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
        <Select data={["Pensione completa", "Mezza pensione", "Bed & Breakfast"]} handler={e => handler(e, data.reductionId, "boardType")} activeValue={data.boardType} />
      </div>
      <div className="item">
        <label htmlFor="">Limite Età</label>
        <Input
            type="number"
            handler={e => handler(e, data.reductionId, "agelimit")}
            d={{ value: data.agelimit, label: "Enter Limite Età" }}
          />
      </div>
      <div className="item">
        <label htmlFor="">Sconto(%)</label>
        <Input
            type="number"
            handler={e => handler(e, data.reductionId, "discount")}
            d={{ value: data.discount, label: "Enter Sconto" }}
          />
      </div>
    </div>
  );
}