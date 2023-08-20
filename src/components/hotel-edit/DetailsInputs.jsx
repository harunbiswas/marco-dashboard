import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { PiArrowSquareOutBold } from "react-icons/pi";
import Select from "../basic/Select";
import Input from "./Input";
import TextArea from "./TextArea";

export default function DetailsInputs() {
  const [inputs, setInputs] = useState([
    {
      label: "Hotel Name",
      value: "San Pietro di Positano",
    },
    {
      label: "Hotel ID",
      value: "HT2035-23",
    },
    {
      label: "Morgana ID",
      value: "3430098483409",
    },
    {
      label: "Hotel Website",
      value: "https://www.borgosantandrea.it",
      url: true,
    },
    {
      label: "Email",
      value: "patrizgasalci.arni61@gmail.com",
    },
    {
      label: "Phone Number",
      value: "+1 (234) 567 - 891",
      number: true,
    },

    {
      label: "Hotel XMLurl",
      value: "https://databaselink.com",
      url: true,
    },

    {
      label: "Priority",
      value: "32",
    },
  ]);
  const [textareas, setTextAreas] = useState([
    {
      label: "Hotel Description",
    },
    {
      label: "Summary Description",
    },
    {
      label: "Rooms Description",
    },
  ]);

  const changeHandler = (label, newValue) => {
    if (label === "Priority") {
      const updatedInputs = inputs.map((input) =>
        input.label === label ? { ...input, value: parseInt(newValue) } : input
      );
      setInputs(updatedInputs);
    } else {
      const updatedInputs = inputs.map((input) =>
        input.label === label ? { ...input, value: newValue } : input
      );
      setInputs(updatedInputs);
    }
  };
  return (
    <>
      <div className="hotel-form-details-wrp">
        {inputs.map((d, i) => (
          <div key={i} className="hotel-form-details-item">
            <label htmlFor={i}>{d.label}</label>
            <div className="inner">
              {d.number && <Select data={["🇱🇷", "🇧🇩", "🇸🇳"]} />}
              <Input handler={(e) => changeHandler(d.label, e)} d={d} i={i} />
              {d.url && (
                <a href={d.value} target="blank">
                  <PiArrowSquareOutBold />
                </a>
              )}
            </div>
          </div>
        ))}
        {textareas.map((d, i) => (
          <>
            {" "}
            <div key={i} className="hotel-form-details-item full">
              <label htmlFor="">{d.label}</label>
              <div className="inner">
                <TextArea />
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="buttons">
        {!textareas.some(
          (textarea) => textarea.label === "Spa Description"
        ) && (
          <button
            onClick={() => {
              setTextAreas((prev) => {
                return [...prev, { label: "Spa Description" }];
              });
            }}
          >
            <BiPlus />
            Add Spa Description
          </button>
        )}
        {!textareas.some(
          (textarea) => textarea.label === " Restaurants Description"
        ) && (
          <button
            onClick={() => {
              setTextAreas((prev) => {
                return [...prev, { label: " Restaurants Description" }];
              });
            }}
          >
            <BiPlus />
            Add Restaurants Description
          </button>
        )}
      </div>
    </>
  );
}
