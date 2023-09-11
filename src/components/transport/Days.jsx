import { useState } from "react";

export default function Days() {
  const [days, setDays] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  const [activeDays, setActiveDays] = useState([
    "Sunday",
    "Monday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

  const handler = (day) => {
    if (activeDays.includes(day)) {
      setActiveDays((prevDays) => prevDays.filter((d) => d !== day));
    } else {
      setActiveDays((prev) => {
        return [...prev, day];
      });
    }
  };
  return (
    <div className="transport-days">
      <div className="top">
        <strong>Validity Day</strong>{" "}
        {!(days === activeDays) && (
          <button onClick={() => setActiveDays(days)}>Select All</button>
        )}
      </div>
      <ul className="days">
        {days.map((day) => (
          <li className={activeDays.includes(day) && "active"} key={day}>
            <button onClick={() => handler(day)}>{day}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
