import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useParams } from "react-router-dom";
import values from "../../../values";
import Select from "../basic/Select";
import EditTitle from "./EditTItle";
import Input from "./Input";

const defaultDistances = [
  {
    id: 1,
    isEdit: false,
    label: "Distanza dal Mare",
    distance: 0,
    scale: "Mt",
  },
  {
    id: 2,
    isEdit: false,
    label: "Distanza dal Centro",
    distance: 0,
    scale: "Mt",
  },
  {
    id: 3,
    isEdit: false,
    label: "Distanza dalle Terme",
    distance: 0,
    scale: "Mt",
  },
];

const LocationDistances = ({ data, setData, fixtData }) => {
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
      if (item.id === itemId) {
        return {
          ...item,
          [property]: newValue,
          isEdit: false,
        };
      }
      return item;
    });
    setDistances(updatedDestinces);
  };
  useEffect(() => {
    axios
      .get(`${values.url}/hotel/single?id=${id}`)
      .then((d) => {
        setDistances(fixtData?.distance || []);
      })
      .catch((e) => {
        console.log(e);
        setDistances(defaultDistances);
      });
  }, [fixtData]);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        distance: distances,
      };
    });
  }, [distances]);

  const deleteHandler = (item) => {
    setDistances((prevDistances) =>
      prevDistances.filter((distance) => distance.id !== item.id)
    );
  };

  console.log(data);
  return (
    <div className="location-details-bottom">
      <h4>Distanza</h4>
      <p>Inserisci le distanze dai vari posti</p>

      <div className="destince">
        {distances.map((d, i) => (
          <>
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
                <Input
                  d={{ value: d.distance, label: "" }}
                  handler={(e) => handleChange(d.id, e, "distance")}
                />
                <button onClick={() => deleteHandler(d)} className="delete-btn">
                  <AiFillDelete />
                </button>
              </div>
            </div>
          </>
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
