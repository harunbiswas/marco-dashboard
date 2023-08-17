import { useState } from "react";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { HiMiniDocumentText, HiReceiptPercent } from "react-icons/hi2";

export default function EditMenu() {
  const [menus, setMenus] = useState([
    { id: 1, name: "Hotel Details", icon: <HiMiniDocumentText /> },
    { id: 2, name: "Location Details", icon: <FaLocationDot /> },
    {
      id: 3,
      name: "Offer Details",
      icon: <HiReceiptPercent />,
    },
    {
      id: 4,
      name: "Publish",
      icon: <BsFillBookmarkStarFill />,
    },
  ]);
  const [active, setActive] = useState(1);

  return (
    <ul className="edit-menu">
      {menus.map((menu, i) => (
        <li
          className={`edit-menu-item ${(menu.id <= active && "active") || ""} `}
          key={i}
        >
          <div className="left">
            <span>{menu.icon}</span>
          </div>
          <div className="right">
            <span>Step {i + 1}</span>
            <strong>{menu.name}</strong>
          </div>
        </li>
      ))}
    </ul>
  );
}
