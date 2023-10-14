import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaAngleUp } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import values from "../../../values";

export default function DateList({
  handler,
  addhotel,
  setDates,
  tempLoad,
  setTempLoad,
}) {
  const ref = useRef(null);
  const wrp = useRef(null);

  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  const createHandler = () => {
    setDates(activeID?.dates);
    handler(false);
  };

  useEffect(() => {
    wrp.current.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(false);
      }
    });
  });

  const [offers, setOffers] = useState([]);

  const [isOffer, setIsOffer] = useState(true);
  const [activeID, setActiveId] = useState(null);
  const [istoggle, setIsToggle] = useState(null);

  useEffect(() => {
    axios.get(`${values.url}/module/dateTempletes`).then((d) => {
      setOffers(d.data);
    });
  }, [tempLoad]);

  const deleteHandler = (item) => {
    axios
      .delete(`${values.url}/module/dateTemplete?id=${item?._id}`, {
        headers: {
          token,
        },
      })
      .then((d) => {
        setTempLoad(!tempLoad);
      });
  };

  const [search, setSearch] = useState("");
  return (
    <div
      ref={wrp}
      className={`add-hotel ${(addhotel && "show") || ""} module-template  `}
    >
      <div ref={ref} className="add-hotel-inner weessddsdf">
        <div className="add-hotel-top">
          <span>
            <FaRegCalendarDays />
          </span>
          <button onClick={() => handler(false)} className="close">
            <IoClose />
          </button>
        </div>

        <div className="add-hotel-body">
          <h4>Template lista Date</h4>
          <p>Seleziona il template della lista date che desideri importare</p>
          <div className="module-template-search">
            <label htmlFor="search">
              <BiSearch />
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Cerca"
              id="search"
            />
          </div>
          <div className={`module-template-items `}>
            <div className="right  date">
              {offers
                ?.filter((item) => item.name.includes(search))
                ?.map((item, i) => (
                  <>
                    {(item?.dates.length && (
                      <div key={i} className="del-wrp">
                        <div
                          className={`item ${
                            (activeID?._id === item._id && "active") || ""
                          }`}
                          onClick={() => {
                            setActiveId(item);
                          }}
                        >
                          <div className="body">
                            <div className="sdlkjflawewks">
                              <FaRegCalendarDays />
                              <div className="content">
                                <h4>{item.name}</h4>
                                <p>
                                  {(item?.dates.length === 1 && "1 Data") ||
                                    (item?.dates.length > 1 &&
                                      `${item?.dates.length} Date`)}
                                </p>
                              </div>
                            </div>

                            {(!(istoggle === item._id) && (
                              <button
                                onClick={() => {
                                  setIsToggle(item._id);
                                  setActiveId(null);
                                }}
                                className="btn btn-white"
                              >
                                Vedi Dettagli
                              </button>
                            )) || (
                              <button
                                onClick={() => setIsToggle(null)}
                                className="close"
                              >
                                <FaAngleUp />
                              </button>
                            )}
                          </div>

                          <div
                            className={`offer-item-body date ${
                              (istoggle === item._id && "show") || ""
                            }`}
                          >
                            <div className="date-body">
                              <div className="date-body-left">
                                <p>Data d'inizio</p>
                                {item?.dates?.map((date, i) => (
                                  <div key={i} className="date-body-item">
                                    {date?.start}
                                  </div>
                                ))}
                              </div>
                              <div className="date-body-right">
                                <p>Data finale</p>
                                {item?.dates?.map((date, i) => (
                                  <div key={i} className="date-body-item">
                                    {date?.end}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          className="del-icon"
                          onClick={() => deleteHandler(item)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    )) ||
                      ""}
                  </>
                ))}
            </div>
          </div>
        </div>

        <div className="add-hotel-footer">
          <button
            onClick={() => {
              handler(false);
            }}
            className="btn cancel"
          >
            Annulla
          </button>
          <button onClick={createHandler} className="btn">
            Seleziona
          </button>
        </div>
      </div>
    </div>
  );
}
