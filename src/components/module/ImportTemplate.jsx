import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { BiSearch, BiSolidOffer } from "react-icons/bi";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaAngleUp } from "react-icons/fa";
import { ImGlass } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import values from "../../../values";
import Description from "../hotel/Description";
import OfferTags from "../hotel/OfferTags";

export default function ImportTemplate({
  handler,
  addhotel,
  tempLoad,
  setDates,
}) {
  const navigate = useNavigate();

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

  const [isOffer, setIsOffer] = useState(false);
  const [activeID, setActiveId] = useState([]);
  const [istoggle, setIsToggle] = useState(null);

  useEffect(() => {
    axios.get(`${values.url}/hotel`).then((d) => {
      setItems(d.data);
    });
  }, [tempLoad]);

  const createHandler = () => {
    setDates((prev) => {
      return [
        ...prev,
        {
          start: moment(activeID?.startDate).format("YYYY-MM-DD"),
          end: moment(activeID?.endDate).format("YYYY-MM-DD"),
          carrency: activeID?.currency,
          id: (prev.length && prev.length + 1) || 1,
          hotelName: isOffer?.name,
          offerName: activeID?.name,
          price: activeID?.price,
        },
      ];
    });
    handler(false);
  };

  return (
    <div
      ref={wrp}
      className={`add-hotel ${(addhotel && "show") || ""} module-template ${
        isOffer && "offer"
      }`}
    >
      <div ref={ref} className="add-hotel-inner">
        <div className="add-hotel-top">
          <span>
            {(isOffer && <BiSolidOffer />) || <BsFillBuildingsFill />}
          </span>
          <button onClick={() => handler(false)} className="close">
            <IoClose />
          </button>
        </div>

        <div className="add-hotel-body">
          <h4>{(isOffer && "Select Offer") || "Select Hotel"}</h4>
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
          <div
            className={`module-template-items max ${(isOffer && "hide") || ""}`}
          >
            <div className="left">
              {items.map((item, i) => (
                <div
                  key={i}
                  className={`item`}
                  onClick={() => setIsOffer(item)}
                >
                  <BsFillBuildingsFill />
                  <div className="content">
                    <h4>{item.name}</h4>
                    <p>{item?.offers?.length}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="right">
              {isOffer &&
                isOffer?.offers?.map((item, i) => (
                  <div
                    key={i}
                    className={`item ${
                      (activeID?._id === item._id && "active") || ""
                    }`}
                    onClick={() => {
                      setActiveId(item);
                    }}
                  >
                    <div className="body">
                      <BiSolidOffer />
                      <div className="content">
                        <h4>{item.name}</h4>
                        <p>
                          From {moment(item?.startDate).format("DD MMMM")} -{" "}
                          {moment(item?.endDate).format("DD MMMM")}
                        </p>
                      </div>
                      {(!(istoggle === item.id) && (
                        <button
                          onClick={() => {
                            setIsToggle(item.id);
                            setActiveId(null);
                          }}
                          className="btn btn-white"
                        >
                          View Details
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
                      className={`offer-item-body ${
                        (istoggle === item.id && "show") || ""
                      }`}
                    >
                      <Description description={item?.description} max={20} />
                      <div className="conditions">
                        <h4>Conditions</h4>
                        <ul className="conditions-wrp">
                          <li>&#x2713; Minimum 2 Nights </li>
                          <li>&#x2713; Minimum 7 Nights </li>
                        </ul>
                      </div>
                      <div className="conditions">
                        <h4>
                          <ImGlass />
                          Beverage Included
                        </h4>
                      </div>

                      <div className="price">
                        <h4>Price</h4>
                        <ul className="price-items">
                          {item?.breakdown?.map((d, i) => (
                            <li key={i}>
                              <p>{d.name}</p>
                              <strong>
                                {d?.currency}
                                {d?.price} <span>/{d?.priceType}</span>
                              </strong>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="offer-item-tags">
                        <h4>Tags</h4>
                        <OfferTags ta={item?.tags} isTagEdit={false} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {isOffer && (
          <div className="add-hotel-footer">
            <button
              onClick={() => {
                setIsOffer(false);
                setIsToggle(null);
              }}
              className="btn cancel"
            >
              back
            </button>
            <button onClick={createHandler} className="btn">
              Select
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
