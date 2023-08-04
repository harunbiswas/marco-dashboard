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
        {data?.td.map((d, i) => (
          <tr
            key={i}
            onClick={() => {
              data.setIsIndex(i);
            }}
            className={`${(data.isIndex === i && "active") || ""}`}
          >
            <td
              onClick={(e) => {
                data.detailsHandler(!data.isDetails);
              }}
            >
              {(i < 9 && "0" + (i + 1)) || i + 1}
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "id")) {
                  data.detailsHandler(!data.isDetails);
                  e.target.blur();
                } else {
                  data.detailsHandler(false);
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("id");
                data.detailsHandler(false);
              }}
              className="id"
            >
              {" "}
              <Input data={{ value: d.id }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "fName")) {
                  data.detailsHandler(!data.isDetails);
                  e.target.blur();
                } else {
                  data.detailsHandler(false);
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("fName");
                data.detailsHandler(false);
              }}
              className="user-table"
            >
              <Input data={{ value: d.fName }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "lName")) {
                  data.detailsHandler(!data.isDetails);
                  e.target.blur();
                } else {
                  data.detailsHandler(false);
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("lName");
                data.detailsHandler(false);
              }}
            >
              {" "}
              <Input data={{ value: d.lName }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "email")) {
                  data.detailsHandler(!data.isDetails);
                  e.target.blur();
                } else {
                  data.detailsHandler(false);
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("email");
                data.detailsHandler(false);
              }}
              className="email"
            >
              {" "}
              <Input data={{ value: d.email }} />
            </td>
            <td
              onClick={(e) => {
                if (!isFocus || !(isFocus === "phone")) {
                  data.detailsHandler(!data.isDetails);
                  e.target.blur();
                } else {
                  data.detailsHandler(false);
                }
              }}
              onDoubleClick={(e) => {
                setIsFocus("phone");
                data.detailsHandler(false);
              }}
              className="phone"
            >
              <div className="in">
                <MdCall /> <Input data={{ value: d.phone }} />
              </div>
            </td>
            <td
              onClick={(e) => {
                data.detailsHandler(!data.isDetails);
              }}
              onDoubleClick={(e) => {
                setIsFocus("true");
                data.detailsHandler(false);
              }}
            >
              <div className="inner">
                <strong>{moment(d.lastQuoteSent).format("MMM DD, YY")}</strong>{" "}
                <span>{moment(d.lastQuoteSent).format("h: MM a")}</span>
              </div>
            </td>
            <td
              onClick={(e) => {
                data.detailsHandler(!data.isDetails);
              }}
              onDoubleClick={(e) => {
                setIsFocus("quateSend");
                data.detailsHandler(false);
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
