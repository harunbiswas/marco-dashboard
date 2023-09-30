import axios from "axios";

const values = {};

// values.url = "http://localhost:5000";
values.url = "https://marco-backend-update.vercel.app";

values.profileMenu = [
  {
    name: "Logout",
    url: "/",
  },
];
values.notific = [
  {
    name: "notification 1",
    url: "/",
  },
  {
    name: "notification 1",
    url: "/",
  },
  {
    name: "profile",
    url: "/",
  },
  {
    name: "notification 1",
    url: "/",
  },
  {
    name: "notification 1",
    url: "/",
  },
];

values.filterData = [
  {
    name: "Module",
    items: ["Eden", "Dellevue", "Eden E Tirrenia"],
  },
  {
    name: "ModuCittàle",
    count: 1,
    items: ["Eden", "Dellevue", "Eden E Tirrenia"],
  },
  {
    name: "Trasporto",
    items: ["Eden", "Dellevue", "Eden E Tirrenia"],
  },
  {
    name: "Tipi di Camera",
    items: ["Eden", "Dellevue", "Eden E Tirrenia"],
  },
];

values.requestTH = [
  "ID",
  "User Details",
  "date",
  "Module",
  "Citta",
  "Trasporto",
  "Tipi di Camera",
  "Periodo Soggiorno ",
  "price",
  "status",
];

values.userTH = [
  "ID",
  "First Name",
  "LastName",
  "Email",
  "Phone Number",
  "Last quote sent",
  "Number of quote sent",
];

values.generateUniqueString = () => {
  const array = new Uint32Array(2);

  window.crypto.getRandomValues(array);

  return (
    "#" +
    Array.from(array, (dec) => dec.toString(36))
      .join("")
      .slice(0, 16)
  );
};

values.getCityState = (setCitys) => {
  axios
    .get(
      "http://secure.geonames.org/childrenJSON?geonameId=3175395&username=hoescapedashboard"
    )
    .then((d) => {
      setCitys(d?.data.geonames);
    })
    .catch((e) => {
      console.log(e);
    });
};
values.getState = (setCitys, regionCode) => {
  axios
    .get(
      `http://secure.geonames.org/childrenJSON?geonameId=${regionCode}&username=hoescapedashboard`
    )
    .then((d) => {
      setCitys(d?.data.geonames);
    })
    .catch((e) => {
      console.log(e);
    });
};

export default values;
