import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { HiDocumentText } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import values from "../../../values";

export default function RegionTemplate({
  handler,
  addhotel,
  setData,
  tempLoad,
  setTempLoad,
}) {
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  const [isDelete, setIsDelete] = useState(false);

  const ref = useRef(null);
  const wrp = useRef(null);

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(false);
      }
    });
  });

  const [items, setItems] = useState([]);

  const [activeItem, setActiveItem] = useState({});

  const createHandler = () => {
    setData(activeItem?.dates);
    handler(false);
  };

  useEffect(() => {
    axios
      .get(`${values.url}/module/regionTempletes`, {
        headers: {
          token,
        },
      })
      .then((d) => {
        setItems(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [tempLoad]);

  const deleteHandler = () => {
    axios
      .delete(`${values.url}/module/regionTemplete?id=${activeItem?._id}`, {
        headers: {
          token,
        },
      })
      .then((d) => {
        setIsDelete(false);
        setTempLoad(!tempLoad);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div
      ref={wrp}
      className={`add-hotel ${(addhotel && "show") || ""} module-template`}
    >
      <div ref={ref} className="add-hotel-inner">
        <div className="add-hotel-top">
          <span>
            <HiDocumentText />
          </span>
          <button onClick={() => handler(false)} className="close">
            <IoClose />
          </button>
        </div>
        <div className="add-hotel-body">
          <h4>Module Templates</h4>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text
          </p>
          <div className="module-template-search">
            <label htmlFor="search">
              <BiSearch />
            </label>
            <input type="text" placeholder="Search" id="search" />
            <button className="btn">Search</button>
          </div>
          <div className="module-template-items">
            <div className="left">
              {items.map((item, i) => (
                <div
                  key={i}
                  className={`item ${
                    (activeItem?._id === item?._id && "active") || ""
                  }`}
                  onClick={() => {
                    setActiveItem(item);
                  }}
                >
                  <HiDocumentText />
                  <div className="content">
                    <h4>{item?.name}</h4>
                    <p>Data: {item?.dates.length}</p>
                  </div>
                  <button
                    onClick={() => setIsDelete(true)}
                    className="del-icon"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isDelete && (
          <div className="isdelete">
            <h2 className="jakarta">
              do you want delete the Template {activeItem?.name}
            </h2>

            <div className="buttons">
              <button
                onClick={() => {
                  setIsDelete(false);
                  handler(true);
                }}
                className="btn"
              >
                Cancel
              </button>
              <button onClick={deleteHandler} className="delete-btn btn">
                Delete
              </button>
            </div>
          </div>
        )}
        <div className="add-hotel-footer ">
          <button onClick={() => handler(false)} className="btn cancel">
            Cancel
          </button>
          <button onClick={createHandler} className="btn">
            Select
          </button>
        </div>
      </div>
    </div>
  );
}