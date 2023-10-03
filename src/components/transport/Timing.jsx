import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

export default function Timing({ setData, transportData, add }) {
  const rx = /^(\d+(\.\d{0,2})?)?$/;
  const [times, setTimes] = useState([
    {
      id: 1,
      start: "",
      end: "",
      cost: 0,
    },
  ]);

  const handleUpdateValue = (e, id) => {
    setTimes((prevTimes) => {
      return prevTimes.map((time) => {
        if (time.id === id) {
          return {
            ...time,
            [e.target.name]:
              (e.target.name === "cost" &&
                ((rx.test(e.target.value.toString()) && e.target.value) ||
                  (e.target.value.length < 2 ? 0 : time.cost))) ||
              e.target.value,
          };
        }
        return time;
      });
    });
  };

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        timing: times,
      };
    });
  }, [times]);

  useEffect(() => {
    if (transportData && !add) {
      setTimes(transportData?.timing || []);
    } else {
      setTimes([
        {
          id: 1,
          start: "",
          end: "",
          cost: 0,
        },
      ]);
    }
  }, [transportData]);

  return (
    <div className="timeing">
      <strong>Fascia Aggiuntiva Prezzi</strong>

      <div className="timeing-body">
        {times.map((d) => (
          <div key={d.id} className="timeing-item">
            <input
              onChange={(e) => handleUpdateValue(e, d.id)}
              value={d?.start}
              max={d?.end}
              type="date"
              name="start"
              id=""
            />{" "}
            <input
              onChange={(e) => handleUpdateValue(e, d.id)}
              value={d?.end}
              min={d?.start}
              type="date"
              name="end"
              id=""
              placeholder="Data Fine"
            />
            <input
              type="text"
              name="cost"
              value={d.cost}
              onChange={(e) => handleUpdateValue(e, d.id)}
              placeholder="Costo"
            />
            <button
              onClick={() => {
                setTimes((prevTimes) =>
                  prevTimes.filter((time) => time.id !== d.id)
                );
              }}
              className="btn"
            >
              <AiOutlineDelete />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setTimes((prev) => {
            return [
              ...prev,
              {
                id: prev.length ? prev[prev.length - 1].id + 1 : 1,
                start: "",
                end: "",
                cost: 0,
              },
            ];
          });
        }}
      >
        <AiOutlinePlus />
        Aggiungi Fascia
      </button>
    </div>
  );
}
