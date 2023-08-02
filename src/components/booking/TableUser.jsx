import moment from "moment";
import { useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { MdCall } from "react-icons/md";
import Input from "./Input";

export default function TableUser({ data }) {
  const [isDetails, setIsDetails] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <table className="table table-user">
      <thead>
        <tr>
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
        {data?.td.map((d, i) => (
          <tr
            key={i}
            onClick={() => {
              data.setIsIndex(i);
            }}
            className={`${(data.isIndex === i && "active") || ""}`}
          >
            <td>{(i < 9 && "0" + (i + 1)) || i + 1}</td>
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
              }}
              className="id"
            >
              {" "}
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
              }}
              className="user-table"
            >
              <Input data={{ value: d.fName }} />
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
              }}
            >
              {" "}
              <Input data={{ value: d.lName }} />
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
              }}
              className="email"
            >
              {" "}
              <Input data={{ value: d.email }} />
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
              }}
              className="phone"
            >
              <div className="in">
                <MdCall /> <Input data={{ value: d.phone }} />
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
              }}
            >
              <div className="inner">
                <strong>{moment(d.lastQuoteSent).format("MMM DD, YY")}</strong>{" "}
                <span>{moment(d.lastQuoteSent).format("h: MM a")}</span>
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
              }}
            >
              {d.quoteSent}
            </td>

            <td>
              <button onClick={() => data.detailsHandler(true)}>
                View Booking Info
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
