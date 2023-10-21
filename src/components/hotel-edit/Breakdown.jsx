import { useEffect } from "react";
import Select from "../basic/Select";
import Input from "./Input";

export default function Breakdown({ data, handler, minStay, maxStay, i }) {
  const def = ["Pensione completa", "Mezza pensione", "Bed & Breakfast"];

  useEffect(() => {
    if (minStay && maxStay) {
      let num =
        (Number(minStay) !== Number(maxStay) && "Costo giornaliero") ||
        "Totale offerta";

      handler(num, null, "priceType");
    }
  }, [minStay, maxStay]);

  return (
    <div className="breakdown-inner">
      <div className="item fjjjsjdfkskfjksflsd">
        <label htmlFor="">Seleziona tipo pensione</label>
        <Input d={{ value: def[i] }} />
      </div>
      <div className="item">
        <label htmlFor="">Tipo di prezzo</label>
        <Select
          data={["Costo giornaliero", "Totale offerta"]}
          handler={(e) => handler(e, data?.breakdownId, "priceType")}
          activeValue={
            data.priceType === 1 ? "Costo giornaliero" : "Totale offerta"
          }
        />
      </div>
      <div className="item">
        <label htmlFor="">Prezzo</label>
        <div className="inner">
          <Select
            data={["€", "$"]}
            activeValue={data.currency}
            handler={(e) => handler(e, data.breakdownId, "currency")}
          />
          <Input
            handler={(e) => handler(e, data.breakdownId, "price")}
            d={{ value: data.price, label: "Enter price" }}
          />
        </div>
      </div>
    </div>
  );
}
// export default function Breakdown({ data, handler }) {
//   console.log("breakdown data", data);
//   return (
//     <div className="breakdown-inner">
//       <div className="item">
//         <label htmlFor="">{engToItLabel[data.label] ?? data.label}</label>

//         {(data.input && (
//           <div className="inner">
//             <Select
//               data={data.items}
//               activeValue={data.label === "Price" ? "€" : ""}
//             />
//             <Input
//               handler={(e) => handler(e)}
//               d={{ value: data.value || 0, label: "Enter price" }}
//             />
//           </div>
//         )) || <Select data={data.items} />}
//         {}
//       </div>
//     </div>
//   );
// }
