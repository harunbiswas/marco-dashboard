import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditTitle from "./EditTItle";
import { FiEdit } from "react-icons/fi";
import Select from "../basic/Select";
import Input from "./Input";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import values from "../../../values";

const defaultDistances = [
  {
    id: "1",
    isEdit: false,
    label: "Distanza dal Mare",
    distance: 0,
    scale: "Mt",
  },
  {
    id: "2",
    isEdit: false,
    label: "Distanza dal Centro",
    distance: 0,
    scale: "Mt",
  },
  {
    id: "3",
    isEdit: false,
    label: "Distanza dalle Terme",
    distance: 0,
    scale: "Mt",
  },
];

const LocationDistances = ({ data, setData }) => {
  const [distances, setDistances] = useState([]);
  const { id } = useParams();
  const toggleEdit = (itemId) => {
    const updatedDestinces = distances.map((item) => {
      if (item.id === itemId) {
        return { ...item, isEdit: !item.isEdit };
      }
      return item;
    });
    setDistances(updatedDestinces);
  };

  const handleChange = (itemId, newValue, property) => {
    const updatedDestinces = distances.map((item) => {
      console.log(item.id, itemId)
      if (item.id === itemId) {
        return { ...item, [property]: newValue, isEdit: false };
      }
      return item;
    });
    setDistances(updatedDestinces);
  };
  useEffect(() => {
    axios
      .get(`${values.url}/hotel/single?id=${id}`)
      .then((d) => {
        setDistances(
          d.data?.distance
            ? !!d.data?.distance.length
              ? d.data?.distance
              : defaultDistances
            : defaultDistances
        );
      })
      .catch((e) => {
        console.log(e);
        setDistances(defaultDistances);
      });
  }, []);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        distance: distances,
      };
    });
  }, [distances]);

  return (
    <div className="location-details-bottom">
      <h4>Distanza</h4>
      <p>Inserisci le distanze dai vari posti</p>

      <div className="destince">
        {distances.map((d, i) => (
          <div key={i} className="destince-item">
            <div className="destince-item-top">
              <span>{d.label}</span>
              <EditTitle
                closeHandler={(e) => toggleEdit(d.id)}
                changeHandler={(e) => handleChange(d.id, e, "label")}
                isShow={d.isEdit}
                data={d.label}
              />
              <button onClick={() => toggleEdit(d.id)}>
                <FiEdit />
              </button>
            </div>
            <div className="destince-item-body">
              <Select
                data={["Mt", "Km"]}
                activeValue={d.scale}
                handler={(e) => handleChange(d.id, e, "scale")}
              />
              <Input d={{ value: d.distance, label: "" }} handler={(e) => handleChange(d.id, e, "distance")} />
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            setDistances((prev) => {
              return [
                ...prev,
                {
                  id: prev.length + 1,
                  label: "distance from center",
                  distance: 30,
                  scale: "Mt",
                },
              ];
            });
          }}
        >
          <AiOutlinePlus /> Add more
        </button>
      </div>
    </div>
  );
};

export default LocationDistances;
