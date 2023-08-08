import { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";

export default function AddBtn() {
  const [isDr, setIsDr] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsDr(false);
      }
    });
  }, []);
  return (
    <div ref={ref} className="add-btn">
      <button onClick={() => setIsDr(!isDr)}>
        <BiPlus />
        <span>Add</span>
      </button>
      <div className={`dropdown ${(isDr && "show") || ""}`}></div>
    </div>
  );
}
