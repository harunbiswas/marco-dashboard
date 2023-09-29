import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import values from "../../../values";
import TransportItem from "./TransportItem";

export default function TransportBody({ handler }) {
  const [transport, setTransport] = useState([]);
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;

  useEffect(() => {
    axios
      .get(`${values.url}/transport`, {
        headers: {
          token,
        },
      })
      .then((d) => {
        setTransport(d.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  console.log(transport);
  return (
    <div className="transport-body">
      {transport &&
        transport.length &&
        transport.map((item) => (
          <TransportItem key={item._id} data={item} handler={handler} />
        ))}
    </div>
  );
}
