import axios from "axios";
import moment from "moment";
import { createRef, useEffect, useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import values from "../../../values";
import Input from "../booking/Input";

export default function ModuleTable({ data, searchData }) {
  const navigate = useNavigate();
  const [td, setTD] = useState([]);
  const [mainTD, setMainTD] = useState([]);

  const th = [
    "ID",
    "Module Name",
    "Last Modified By",
    "Total Request",
    "Panding Request",
  ];

  const [isFocus, setIsFocus] = useState(false);

  const inp = useRef(td.map(() => createRef()));
  const [index, setIndex] = useState(null);

  const addPriceHandler = (itemId, newPrice, i) => {
    setTD((prevTD) => {
      // Find the item with the given itemId
      const updatedTD = prevTD.map((item) => {
        if (item.id === itemId) {
          // Return a new item object with the updated price
          return { ...item, price: newPrice, added: "Marco" };
        }
        return item; // Return unchanged item for other items
      });
      return updatedTD;
    });
    setIndex(i);
  };

  useEffect(() => {
    if (index || index === 0) {
      inp.current[index].current.childNodes[1].focus();
    }
  }, [index]);

  useEffect(() => {
    axios.get(`${values.url}/module`).then((d) => {
      setTD(d.data);
      setMainTD(d.data);
    });
  }, []);

  // select handler
  const selectHandler = (e) => {
    setTD((prevTD) =>
      prevTD.map((item) =>
        item.id === e.id ? { ...item, select: !item.select } : item
      )
    );
  };

  const [isDel, setIsDel] = useState(false);
  const del = useRef(null);
  const tbd = useRef(null);

  const contexHandler = (e, s, id) => {
    if (s) {
      e.preventDefault();
      const top = tbd.current.getBoundingClientRect().top;
      del.current.style.top = `${e.clientY - top}px`;
      setIsDel(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (del.current && !del.current.contains(e.target)) {
        setIsDel(false);
      }
    });
  }, []);

  useEffect(() => {
    if (searchData) {
      const filteredData = mainTD.filter(
        (item) =>
          item.name.includes(searchData) ||
          item.id.toString().includes(searchData)
      );
      setTD(filteredData);
    } else {
      setTD(mainTD);
    }
  }, [searchData]);

  return (
    <table className="table table-module" id="table">
      <thead>
        <tr className="th">
          <th>#</th>
          {th.map((d) => (
            <th key={d}>
              <div className="inner">
                <span>{d}</span>
                <div className="icon">
                  <GoTriangleUp />
                  <GoTriangleDown />
                </div>
              </div>
            </th>
          ))}
          <th>Action</th>
        </tr>
      </thead>

      <tbody ref={tbd}>
        <div ref={del} className={`buttons ${(isDel && "show") || ""}`}>
          <button>Delete</button>
        </div>
        {td.map((d, i) => (
          <tr
            key={i}
            onClick={() => {
              data.setIsIndex(i);
            }}
            className={`${(data.isIndex === i && "active") || ""}`}
          >
            <td
              onContextMenu={(e) => contexHandler(e, d.select, d.id)}
              className="selc"
              onClick={() => selectHandler(d)}
            >
              {(d.select && <BsCheckLg />) || (i < 9 && "0" + (i + 1)) || i + 1}
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "id")) {
                  if (data.isIndex === i) {
                    data.detailsHandler(!data.isDetails);
                    e.target.blur();
                  } else {
                    data.setIsIndex(i);
                    data.detailsHandler(true);
                    e.target.blur();
                  }
                } else {
                  if (e.target.tagName !== "INPUT") {
                    if (data.isIndex === i) {
                      console.log(data.isIndex);
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.setIsIndex(i);
                      data.detailsHandler(true);
                      e.target.blur();
                    }
                  } else {
                    data.detailsHandler(false);
                  }
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("id");
                data.detailsHandler(false);
              }}
              className="id"
            >
              <Input data={{ value: d.id }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "name")) {
                  if (data.isIndex === i) {
                    data.detailsHandler(!data.isDetails);
                    e.target.blur();
                  } else {
                    data.setIsIndex(i);
                    data.detailsHandler(true);
                    e.target.blur();
                  }
                } else {
                  if (e.target.tagName !== "INPUT") {
                    if (data.isIndex === i) {
                      console.log(data.isIndex);
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.setIsIndex(i);
                      data.detailsHandler(true);
                      e.target.blur();
                    }
                  } else {
                    data.detailsHandler(false);
                  }
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("name");
                data.detailsHandler(false);
              }}
              className="name"
            >
              <Input data={{ value: d.name }} />
            </td>
            <td
              onClick={() => {
                if (data.isIndex === i) {
                  data.detailsHandler(!data.isDetails);
                } else {
                  data.setIsIndex(i);
                  data.detailsHandler(true);
                }
              }}
            >
              <div
                onClick={() => {
                  if (data.isIndex === i) {
                    data.detailsHandler(!data.isDetails);
                  } else {
                    data.setIsIndex(i);
                    data.detailsHandler(true);
                  }
                }}
                className="inner"
              >
                <strong>{moment(d.date).format("MMM DD, YY")}</strong>{" "}
                <span>{moment(d.date).format("h: MM a")}</span>
              </div>
            </td>

            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "citta")) {
                  if (data.isIndex === i) {
                    data.detailsHandler(!data.isDetails);
                    e.target.blur();
                  } else {
                    data.setIsIndex(i);
                    data.detailsHandler(true);
                    e.target.blur();
                  }
                } else {
                  if (e.target.tagName !== "INPUT") {
                    if (data.isIndex === i) {
                      console.log(data.isIndex);
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.setIsIndex(i);
                      data.detailsHandler(true);
                      e.target.blur();
                    }
                  } else {
                    data.detailsHandler(false);
                  }
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("citta");
                data.detailsHandler(false);
              }}
            >
              {" "}
              <Input data={{ value: d.totalRequ }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "trastorto")) {
                  if (data.isIndex === i) {
                    data.detailsHandler(!data.isDetails);
                    e.target.blur();
                  } else {
                    data.setIsIndex(i);
                    data.detailsHandler(true);
                    e.target.blur();
                  }
                } else {
                  if (e.target.tagName !== "INPUT") {
                    if (data.isIndex === i) {
                      console.log(data.isIndex);
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.setIsIndex(i);
                      data.detailsHandler(true);
                      e.target.blur();
                    }
                  } else {
                    data.detailsHandler(false);
                  }
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("trastorto");
                data.detailsHandler(false);
              }}
            >
              <Input data={{ value: d.pandingRequ }} />
            </td>

            <td
              onClick={() => {
                if (data.isIndex === i) {
                  data.detailsHandler(!data.isDetails);
                } else {
                  data.setIsIndex(i);
                  data.detailsHandler(true);
                }
              }}
            >
              <button
                onClick={() => {
                  navigate(`/module/edit/${d?._id}`);
                }}
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
