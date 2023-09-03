import { useState } from "react";

const AddEmpPopup = ({ setAddEmp, setEditEmp }) => {
  // Popup btns
  const popupBtns = [
    {
      id: 1,
      title: "Admin",
    },
    {
      id: 2,
      title: "Manager",
    },
    {
      id: 3,
      title: "Base",
    },
  ];

  // close popup
  const closePopup = () => {
    setEditEmp ? setEditEmp(false) : null;
    setAddEmp ? setAddEmp(false) : null;
  };

  // select active btn
  const [activeBtn, setActiveBtn] = useState(1);
  return (
    <div className="add_emp">
      <div className="formBox">
        {/* Heading */}
        <div className="heading">
          <p className="jakarta">Create New Employee</p>

          {/* Icon */}
          <svg
            onClick={closePopup}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M10.5807 19.4194L19.4196 10.5806"
              stroke="#84818A"
              strokeWidth="1.875"
              strokeLinecap="round"
            />
            <path
              d="M10.5807 10.5806L19.4196 19.4194"
              stroke="#84818A"
              strokeWidth="1.875"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* border */}
        <div
          className="horizontal_line"
          style={{ marginTop: "10px", marginBottom: "5px" }}
        ></div>

        {/* Box Header */}
        <div className="box_header">
          <h2 className="jakarta">Employee Detail</h2>
          <p className="jakarta">
            Contrary to popular belief, Lorem Ipsum is not simply random text
          </p>
        </div>

        {/* form */}
        <form>
          {/* nameBox */}
          <div className="nameBox">
            {/* name */}
            <div className="box">
              <label htmlFor="name" className="jakarta">
                Name
              </label>
              <input type="text" placeholder="Marco" className="jakarta" />
            </div>

            {/* surname */}
            <div className="box">
              <label htmlFor="surname" className="jakarta">
                Surname
              </label>
              <input type="text" placeholder="Sciosy" className="jakarta" />
            </div>
          </div>

          {/* nameBox */}
          <div className="mailPass">
            {/* name */}
            <div className="box">
              <label htmlFor="name" className="jakarta">
                Email
              </label>
              <input
                type="text"
                placeholder="email@gmail.com"
                className="jakarta"
              />
            </div>

            {/* surname */}
            <div className="box">
              <label htmlFor="surname" className="jakarta">
                Password
              </label>
              <input type="text" placeholder="1234passw" className="jakarta" />
            </div>
          </div>
        </form>

        {/* border */}
        <div className="horizontal_line" style={{ marginBottom: "5px" }}></div>

        {/* Buttons */}
        <div className="security_btns">
          <h2>Security Level</h2>

          <div className="btns">
            {popupBtns?.map((btn) => (
              <button
                onClick={() => setActiveBtn(btn.id)}
                key={btn.id}
                className={`jakarta ${btn.id === activeBtn ? "active" : ""}`}
              >
                {btn.title}
              </button>
            ))}
          </div>
        </div>

        {/* border */}
        <div className="horizontal_line"></div>

        {/* Submit Btns */}
        <div className="submit_btns">
          {/* cancel btn */}
          <button className="cancel jakarta" onClick={closePopup}>
            Delete
          </button>

          {/* submit btn */}
          <button className="next jakarta">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AddEmpPopup;
