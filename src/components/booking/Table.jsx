import moment from "moment";
import { createRef, useEffect, useRef, useState } from "react";
import {
  AiFillCheckCircle,
  AiOutlinePlus,
  AiOutlineQuestion,
} from "react-icons/ai";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import Input from "./Input";

export default function Table({ data }) {
  const [td, setTD] = useState([
    {
      id: 2036,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: null,
      added: "",
    },
    {
      id: 2037,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: null,
      added: "",
    },
    {
      id: 2038,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2039,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2040,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2041,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2042,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2043,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2046,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2047,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2048,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2049,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2060,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2051,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
    {
      id: 2052,
      user: "James Friday",
      quote: 5,
      date: new Date(),
      module: "eden",
      citta: "Capri",
      trasporto: "Bus",
      tipi: "3 Adults, 1 Children",
      periodo: "7 notti €520 per persona | 495",
      dateLine: "27 July - 03 Aug ",
      price: 1700,
      added: "Marco",
    },
  ]);

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
  return (
    <table className="table" id="table">
      <thead>
        <tr className="th">
          <th>#</th>
          {data?.th.map((d) => (
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

      <tbody>
        {td.map((d, i) => (
          <tr
            key={i}
            onClick={() => {
              data.setIsIndex(i);
            }}
            className={`${(data.isIndex === i && "active") || ""}`}
          >
            <td
              onClick={() => {
                data.detailsHandler(!data.isDetails);
              }}
            >
              {(i < 9 && "0" + (i + 1)) || i + 1}
            </td>
            <td
              onClick={(e) => {
                if (!isFocus) {
                  data.detailsHandler(!data.isDetails);
                  e.target.blur();
                } else {
                  data.detailsHandler(false);
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus(true);
                data.detailsHandler(false);
              }}
              className="id"
            >
              <Input data={{ value: d.id }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus) {
                  data.detailsHandler(!data.isDetails);
                  e.target.blur();
                } else {
                  data.detailsHandler(false);
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus(true);
                data.detailsHandler(false);
              }}
              className="name"
            >
              <div className="inner">
                <strong>
                  <Input data={{ value: d.user }} />
                </strong>{" "}
                <span
                  onClick={() => {
                    data.detailsHandler(!data.isDetails);
                  }}
                >
                  {d.quote} quote request
                </span>
              </div>
            </td>
            <td
              onClick={(e) => {
                data.detailsHandler(!data.isDetails);
              }}
            >
              <div
                onClick={() => {
                  data.detailsHandler(!data.isDetails);
                }}
                className="inner"
              >
                <strong>{moment(d.date).format("MMM DD, YY")}</strong>{" "}
                <span>{moment(d.date).format("h: MM a")}</span>
              </div>
            </td>
            <td
              onClick={(e) => {
                if (!isFocus) {
                  data.detailsHandler(!data.isDetails);
                  e.target.blur();
                } else {
                  data.detailsHandler(false);
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus(true);
                data.detailsHandler(false);
              }}
            >
              {" "}
              <Input data={{ value: d.module }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus) {
                  data.detailsHandler(!data.isDetails);
                  e.target.blur();
                } else {
                  data.detailsHandler(false);
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus(true);
                data.detailsHandler(false);
              }}
            >
              {" "}
              <Input data={{ value: d.citta }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus) {
                  data.detailsHandler(!data.isDetails);
                  e.target.blur();
                } else {
                  data.detailsHandler(false);
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus(true);
                data.detailsHandler(false);
              }}
            >
              <Input data={{ value: d.trasporto }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus) {
                  data.detailsHandler(!data.isDetails);
                  e.target.blur();
                } else {
                  data.detailsHandler(false);
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus(true);
                data.detailsHandler(false);
              }}
              className="tipi"
            >
              <Input data={{ value: d.tipi }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus) {
                  data.detailsHandler(!data.isDetails);
                  e.target.blur();
                } else {
                  data.detailsHandler(false);
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus(true);
                data.detailsHandler(false);
              }}
            >
              <div className="inner">
                <strong className="periodo">
                  <Input data={{ value: d.periodo }} />
                </strong>
                <span
                  onClick={() => {
                    data.detailsHandler(!data.isDetails);
                  }}
                >
                  {d.dateLine}
                </span>
              </div>
            </td>
            <td className="price">
              {(d.price && (
                <div
                  onClick={(e) => {
                    if (!isFocus) {
                      data.detailsHandler(!data.isDetails);
                      e.target.blur();
                    } else {
                      data.detailsHandler(false);
                    }
                  }}
                  onDoubleClick={(e) => {
                    setIsFocus(true);
                  }}
                  className="inner"
                >
                  <strong ref={inp.current[i]}>
                    €<Input data={{ value: d.price }} />
                  </strong>
                  <span
                    onClick={(e) => {
                      data.detailsHandler(!data.isDetails);
                    }}
                  >
                    {" "}
                    By {d.added}
                  </span>
                </div>
              )) || (
                <div className="add_price">
                  <button onClick={() => addPriceHandler(d.id, " ", i)}>
                    <AiOutlinePlus /> <span>Add Price</span>
                  </button>
                </div>
              )}
            </td>
            <td
              onClick={(e) => {
                data.detailsHandler(!data.isDetails);
              }}
              onDoubleClick={(e) => {
                setIsFocus(true);
                data.detailsHandler(false);
              }}
            >
              {(!d.price && (
                <div className="waiting">
                  <span>
                    <AiOutlineQuestion />
                  </span>
                  <span>Waiting for Quote </span>
                </div>
              )) || (
                <div className="complate">
                  <span>
                    <AiFillCheckCircle />
                  </span>{" "}
                  <span> Quote Complate </span>
                </div>
              )}
            </td>
            <td
              onClick={(e) => {
                data.detailsHandler(!data.isDetails);
              }}
            >
              <button onClick={() => data.detailsHandler(true)}>
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
