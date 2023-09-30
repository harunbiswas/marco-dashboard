import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import values from "../../../values";
import TransportItem from "./TransportItem";

export default function TransportBody({ handler, search, setTransportData }) {
  const [transport, setTransport] = useState([]);
  const [transportMain, setTransportMain] = useState([]);
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
        setTransportMain(d.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  useEffect(() => {
    console.log(search, transport[0]?.vehicleType);
    if (search) {
      setTransport((prev) => {
        const filteredData = transportMain.filter(
          (item) =>
            item?.vehicleType.toLowerCase().trim() ===
            search?.toLowerCase().trim()
        );
        return filteredData;
      });
    } else {
      setTransport(transportMain);
    }
  }, [search]);

  return (
    <div className="transport-body">
      {transport &&
        transport.length &&
        transport.map((item) => (
          <TransportItem
            setTransportData={setTransportData}
            key={item._id}
            data={item}
            handler={handler}
          />
        ))}
    </div>
  );
}
