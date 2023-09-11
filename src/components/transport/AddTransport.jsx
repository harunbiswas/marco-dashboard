import { useEffect, useRef, useState } from "react";
import { FaCarSide } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Select from "../basic/Select";
import Input from "../hotel-edit/Input";
import Catagory from "./Catagory";
import Days from "./Days";

export default function AddTransport({ handler, addhotel }) {
  const navigate = useNavigate();

  const [hotelId, setHotelId] = useState("");
  const [zip, setZip] = useState("");
  const [name, setName] = useState("");

  const [isError, setIsError] = useState(false);

  const createHandler = () => {
    if (hotelId && name) {
      navigate(`/module/edit/${hotelId}`);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    setIsError(false);
  }, [name, hotelId]);

  const ref = useRef(null);
  const wrp = useRef(null);

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(false);
      }
    });
  });

  return (
    <div
      ref={wrp}
      className={`add-hotel ${(addhotel && "show") || ""} add-transport`}
    >
      <div ref={ref} className="add-hotel-inner">
        <div className="add-hotel-top">
          <span>
            <FaCarSide />
          </span>
          <button onClick={() => handler(false)} className="close">
            <IoClose />
          </button>
        </div>
        <div className="add-hotel-body">
          <h4 className="s-title">Create/Edit Template</h4>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div
              className={`add-hotel-item item-1 ${
                (isError && !hotelId && "error") || ""
              }`}
            >
              <label htmlFor="">Template Name</label>
              <Input
                d={{ value: hotelId, label: "Template Name" }}
                handler={setHotelId}
              />
            </div>{" "}
            <div
              className={`add-hotel-item ${
                (isError && !name && "error") || ""
              }`}
            >
              <label htmlFor="">Template ID</label>
              <Input
                handler={setName}
                d={{ value: name, label: "Template ID" }}
              />
            </div>{" "}
          </form>

          <h4>Starting Point</h4>
          <div className="add-transport-group">
            <div className="form-group">
              <label htmlFor="">City</label>
              <Select data={["Select City", "Select City", "Select City"]} />
            </div>
            <div className="form-group">
              <label htmlFor="">State</label>
              <Select data={["Select state", "Select City", "Select City"]} />
            </div>
            <div className="form-group">
              <label htmlFor="">Zip Code</label>
              <Input d={{ value: zip, label: "Zip code" }} handler={setZip} />
            </div>
          </div>
          <div className="add-transport-group">
            <div className="form-group">
              <label htmlFor="">Address Line 1</label>
              <Input d={{ value: zip, label: "Zip code" }} handler={setZip} />
            </div>
          </div>
        </div>
        <div className="add-hotel-body gap">
          <h4>Transport Details</h4>
          <div className="add-transport-group">
            <div className="form-group">
              <label htmlFor="">Vehicle Type</label>
              <Select data={["Bus + Train", "Select City", "Select City"]} />
            </div>
            <div className="form-group">
              <label htmlFor="">Vehicle Brand</label>
              <Select
                data={["Toyota - Deluxe", "Select City", "Select City"]}
              />
            </div>
          </div>
        </div>
        <div className="add-hotel-body gap">
          <h4>Validity Period</h4>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text
          </p>
          <div className="add-transport-group">
            <div className="form-group">
              <label htmlFor="">Starting Date</label>
              <input type="date" name="" id="" />
            </div>
            <div className="form-group">
              <label htmlFor="">Ending Date</label>
              <input type="date" name="" id="" />
            </div>
          </div>
          <Days />
        </div>{" "}
        <div className="add-hotel-body gap">
          <h4>Pricing by Catagory</h4>
          <Catagory />
        </div>
        <div className="add-hotel-footer">
          <button onClick={() => handler(false)} className="btn cancel">
            Discard
          </button>
          <button onClick={createHandler} className="btn">
            Save & Use Template
          </button>
        </div>
      </div>
    </div>
  );
}
