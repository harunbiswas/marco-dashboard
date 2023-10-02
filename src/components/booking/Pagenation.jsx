import { useEffect, useState } from "react";

export default function Pagenation({ isbrns, max, active, setActiveValue }) {
  const [btns, setBtns] = useState([1]);
  const [activeBtn, setActiveBtn] = useState(btns[0]);
  const showItem = 30;

  useEffect(() => {
    const btn = max / showItem;
    setBtns([]);
    for (let i = 1; i <= btn + 1; i++) {
      setBtns((prev) => {
        return [...prev, i];
      });
    }
  }, [max]);

  useEffect(() => {
    setActiveValue(activeBtn);
  }, [activeBtn]);

  return (
    <div className="pagenation-wrp">
      <span>
        Mostrando {max && showItem * active - showItem + 1} -{" "}
        {(showItem * active < max && showItem * active) || max} su {max || "0"}
      </span>
      {isbrns && (
        <ul className="pagenation">
          <li>
            <button
              onClick={() => {
                if (activeBtn > 1) {
                  setActiveBtn(activeBtn - 1);
                }
              }}
              disabled={activeBtn === 1}
              className="prenext"
            >
              Previous
            </button>
          </li>
          {btns.map((btn) => (
            <li key={btn}>
              <button
                onClick={() => setActiveBtn(btn)}
                className={`pagenation-btn ${
                  (activeBtn === btn && "active") || ""
                }`}
              >
                {btn}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                if (activeBtn < btns[btns.length - 1]) {
                  setActiveBtn(activeBtn + 1);
                }
              }}
              disabled={activeBtn === btns[btns.length - 1]}
              className="prenext"
            >
              next
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
