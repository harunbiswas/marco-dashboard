import { useEffect, useRef, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import values from "../../../values";
import profileImg from "../../assets/images/profile.png";
import Dropdown from "./Dropdown";

export default function Profile() {
  const [isDropdown, setIsDropdown] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsDropdown(false);
      }
    });
  }, []);

  const dropdownHandler = () => {
    setIsDropdown(!isDropdown);
  };
  return (
    <div className="profile" ref={ref}>
      <div className="img">
        <img src={profileImg} alt="" />
      </div>
      <div className="profile-body">
        <strong>Sarah Sanders</strong>
        <span>Sub-Admin</span>
      </div>
      <div className="profile-btn">
        <button onClick={dropdownHandler}>
          <BiSolidDownArrow />
        </button>
      </div>
      {isDropdown && <Dropdown data={values.profileMenu} />}
    </div>
  );
}
