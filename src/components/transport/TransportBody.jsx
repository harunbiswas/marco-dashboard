import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import values from "../../../values";
import Loading from "../basic/Loading";
import TransportItem from "./TransportItem";

export default function TransportBody({
  handler,
  search,
  setTransportData,
  activePage,
  setMaxValue,
  activeMenu,
}) {
  const showItem = 30;
  const [transport, setTransport] = useState([]);
  const [transportMain, setTransportMain] = useState([]);
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${values.url}/transport`, {
        headers: {
          token,
        },
      })
      .then((d) => {
        setTransport(d.data);
        setTransportMain(d.data);
        setMaxValue(d.data.length);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e.response);
      });
  }, []);

  //search

  useEffect(() => {
    if (search) {
      const filteredTransport = transportMain.filter((item) => {
        const searchValue = search?.toLowerCase().replace(/\$/, "").trim();

        if (search[0] === "$") {
          return item?.vehicleType.toLowerCase().includes(searchValue);
        }

        return (
          item?.name.toLowerCase().includes(searchValue) ||
          item?.city.toLowerCase().includes(searchValue) ||
          item?.state.toLowerCase().includes(searchValue)
        );
      });

      // Update state with filtered results
      setTransport(filteredTransport);
    } else {
      setTransport(transportMain);
    }
  }, [search]);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return (
    <div className="transport-body">
      {(activeMenu === "Tutti" &&
        !isloading &&
        transport &&
        transport.length &&
        transport
          .slice(
            transport.length && showItem * activePage - showItem,
            showItem * activePage <
              (transport.length && showItem * activePage) || transport?.length
          )
          .map((item) => (
            <TransportItem
              setTransportData={setTransportData}
              key={item._id}
              data={item}
              handler={handler}
            />
          ))) ||
        (!isloading &&
          transport &&
          transport.length &&
          transport
            .filter((item) => new Date(item.createdAt) > oneWeekAgo)
            .slice(
              transport.length && showItem * activePage - showItem,
              showItem * activePage <
                (transport.length && showItem * activePage) || transport?.length
            )
            .map((item) => (
              <TransportItem
                setTransportData={setTransportData}
                key={item._id}
                data={item}
                handler={handler}
              />
            ))) ||
        (isloading && <Loading />)}
    </div>
  );
}
