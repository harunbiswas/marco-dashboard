import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";

export default function DeleteHotel({
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
    <div
      ref={wrp}
      className={`edit-title-wrp delete-disable ${(isShow && "show") || ""}`}
    >
      <div ref={ref} className={`edit-title booking-box `}>
        <div className="edit-title-top">
          <h4>Delete Hotel</h4>
          <button onClick={closeHandler}>
            <GrClose />
          </button>
        </div>
        <p>Please type the hotel name to be sure that you want delete.</p>

        <div className="item">
          <label htmlFor="">Title Name</label>
          <input type="text" value={value} disabled />
        </div>

        <div className="edit-title-footer">
          <button onClick={closeHandler} className="btn cancel">
            Cancel
          </button>
          <button
            onClick={() => {
              if (value) {
                changeHandler(value);
              }
            }}
            className="btn delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
