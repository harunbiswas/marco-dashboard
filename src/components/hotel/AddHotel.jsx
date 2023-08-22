import { useEffect, useState } from "react";
import { BsFillBuildingsFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Input from "../hotel-edit/Input";

export default function AddHotel({ handler, addhotel }) {
  const navigate = useNavigate();
  const [tags, setTaqs] = useState([
    "Hotel",
    "B&B",
    "Residence",
    "Agriturismo",
    "Villaggio",
    "casa Vacanza",
  ]);
  const [hotelId, setHotelId] = useState("");
  const [name, setName] = useState("");
  const [active, setActive] = useState("");

  const [isError, setIsError] = useState(false);

  const createHandler = () => {
    if (hotelId && name && active) {
      navigate(`/hotel/edit/${hotelId}`);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    setIsError(false);
  }, [name, active, hotelId]);
  return (
    <div className={`add-hotel ${(addhotel && "show") || ""}`}>
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
            <div
              className={`add-hotel-item ${
                (isError && !hotelId && "error") || ""
              }`}
            >
              <label htmlFor="">Hotel ID</label>
              <Input d={{ value: hotelId, label: "#" }} handler={setHotelId} />
            </div>{" "}
            <div
              className={`add-hotel-item ${
                (isError && !name && "error") || ""
              }`}
            >
              <label htmlFor="">Hotel Name</label>
              <Input
                handler={setName}
                d={{ value: name, label: "Enter Full hotel name" }}
              />
            </div>{" "}
            <div
              className={`add-hotel-item ${
                (isError && !active && "error") || ""
              }`}
            >
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
          <button onClick={createHandler} className="btn">
            Create Hotel
          </button>
        </div>
      </div>
    </div>
  );
}
