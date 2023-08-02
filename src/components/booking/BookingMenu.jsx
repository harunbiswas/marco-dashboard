import { useState } from "react";

export default function BookingMneu() {
  const [bookingMenus, setBookingMenus] = useState([
    { name: "all" },
    { name: "New Request", request: 5 },
    { name: "pending" },
    { name: "declined" },
  ]);
  const [activeMenu, setActiveMenu] = useState(bookingMenus[0].name);
  return (
    <div className="booking-main">
      <div className="booking-menu">
        {bookingMenus.map((d, i) => (
          <div
            className={`booking-menu-item ${
              (d.name === activeMenu && "active") || ""
            }`}
            key={i}
          >
            <button onClick={() => setActiveMenu(d.name)} key={i}>
              {d.name}
            </button>
            {d.request && <span>{d.request}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
