import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import Select from "../basic/Select";
import Map from "../hotel/Map";
import Input from "./Input";

export default function LocationDetails() {
  const [destinces, setDestinces] = useState([
    {
      label: "distance from center",
      value: 120,
    },
    {
      label: "distance from center",
      value: 50,
    },
    {
      label: "distance from center",
      value: 30,
    },
  ]);
  return (
    <div className="location-details">
      <h4>Map Location</h4>
      <p>
        Add 2 or more images of the hotel to give the customer a better
        experience
      </p>
      <div className="inputs">
        <div className="inputs-item">
          <label htmlFor="">City</label>
          <Select data={["Select City", "Select City", "Select City"]} />
        </div>
        <div className="inputs-item">
          <label htmlFor="">State</label>
          <Select data={["Select City", "Select City", "Select City"]} />
        </div>
        <div className="inputs-item">
          <label htmlFor="">City</label>
          <Input d={{ value: "", label: "Enter Zip code" }} />
        </div>
      </div>
      <div className="inputs">
        <div className="inputs-item">
          <label htmlFor="">Address Line 1</label>
          <Input d={{ value: "", label: "Select City" }} />
        </div>
      </div>
      <div className="inputs ">
        <div className="inputs-item location">
          <label htmlFor="">Google Map Coordinate</label>
          <Input d={{ value: "", label: "Enter coordinate" }} />
          <span>
            <MdLocationOn />
          </span>
        </div>
      </div>
      <Map />
      <div className="location-details-bottom">
        <h4>Distance</h4>
        <p>
          Add 2 or more images of the hotel to give the customer a better
          experience
        </p>

        <div className="destince">
          {destinces.map((d, i) => (
            <div key={i} className="destince-item">
              <div className="destince-item-top">
                <span>Distance from Center</span>
                <button>
                  <FiEdit />
                </button>
              </div>
              <div className="destince-item-body">
                <Select data={["Metter", "Foot", "k. Metter"]} />
                <Input d={{ value: d.value, label: "" }} />
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              setDestinces((prev) => {
                return [
                  ...prev,
                  {
                    label: "distance from center",
                    value: 30,
                  },
                ];
              });
            }}
          >
            <AiOutlinePlus /> Add more
          </button>
        </div>
      </div>
    </div>
  );
}
