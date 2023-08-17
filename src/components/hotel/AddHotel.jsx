import { useState } from "react";
import { BsFillBuildingsFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import Input from "../hotel-edit/Input";

export default function AddHotel({ handler }) {
  const [tags, setTaqs] = useState([
    "Hotel",
    "B&B",
    "Residence",
    "Agriturismo",
    "Villaggio",
    "casa Vacanza",
  ]);
  const [active, setActive] = useState("Residence");
  return (
    <div className="add-hotel">
      <div className="add-hotel-inner">
        <div className="add-hotel-top">
          <span>
            <BsFillBuildingsFill />
          </span>
          <button onClick={() => handler(false)} className="close">
            <IoClose />
          </button>
        </div>
        <div className="add-hotel-body">
          <h4>Add New Hotel</h4>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="add-hotel-item">
              <label htmlFor="">Hotel ID</label>
              <Input d={{ value: "", label: "#" }} />
            </div>{" "}
            <div className="add-hotel-item">
              <label htmlFor="">Hotel Name</label>
              <Input d={{ value: "", label: "Enter Full hotel name" }} />
            </div>{" "}
            <div className="add-hotel-item">
              <label htmlFor="">Select Hotel Type</label>
              <ul className="add-hotel-item-type">
                {tags.map((d, i) => (
                  <li key={i}>
                    <button
                      className={(d === active && "active") || ""}
                      onClick={() => setActive(d)}
                    >
                      {d}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
        <div className="add-hotel-footer">
          <button onClick={() => handler(false)} className="btn cancel">
            Cancel
          </button>
          <button className="btn">Create Hotel</button>
        </div>
      </div>
    </div>
  );
}
