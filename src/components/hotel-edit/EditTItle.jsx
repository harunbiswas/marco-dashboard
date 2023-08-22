import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import Input from "./Input";

export default function EditTitle({
  data,
  isShow,
  closeHandler,
  changeHandler,
}) {
  const [value, setValue] = useState(data);

  useEffect(() => {
    setValue(data);
  }, [data]);
  return (
    <div className={`edit-title-wrp ${(isShow && "show") || ""}`}>
      <div className={`edit-title booking-box `}>
        <div className="edit-title-top">
          <h4>Edit Title</h4>
          <button onClick={closeHandler}>
            <GrClose />
          </button>
        </div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        <div className="item">
          <label htmlFor="">Title Name</label>
          <Input handler={setValue} d={{ value, label: "Enter Name" }} />
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
            className="btn"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
}
