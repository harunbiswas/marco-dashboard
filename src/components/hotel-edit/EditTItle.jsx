import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import Input from "./Input";

export default function EditTitle({
  isInput = false,
  data,
  isShow,
  closeHandler,
  changeHandler,
}) {
  const [value, setValue] = useState(data);

  useEffect(() => {
    setValue(data);
  }, [data]);

  const ref = useRef(null);
  const wrp = useRef(null);

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        closeHandler();
      }
    });
  });

  return (
    <div ref={wrp} className={`edit-title-wrp ${(isShow && "show") || ""}`}>
      <div ref={ref} className={`edit-title booking-box `}>
        <div className="edit-title-top">
          <h4>{(isInput && "Modifica Descrizione") || "Modifica Titolo"}</h4>
          <button onClick={closeHandler}>
            <GrClose />
          </button>
        </div>
        <p>
          {(isInput && "Modifica il titolo di questa descrizione") ||
            "Modifica il titolo dell'opzione Distanza"}
        </p>

        <div className="item">
          <label htmlFor="">
            {(isInput && "Titolo Descrizione") || "Nome Distanza"}
          </label>
          <Input handler={setValue} d={{ value, label: "Inserisci titolo" }} />
        </div>

        <div className="edit-title-footer">
          <button onClick={closeHandler} className="btn cancel">
            Annulla
          </button>
          <button
            onClick={() => {
              if (value) {
                changeHandler(value);
              }
            }}
            className="btn"
          >
            Modifica
          </button>
        </div>
      </div>
    </div>
  );
}
