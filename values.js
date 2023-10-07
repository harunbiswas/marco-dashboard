const values = {};

values.url = "http://localhost:5000";
// values.url = "https://marco-backend-update.vercel.app";

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
    name: "Tipo di Veicolo",
    items: ["Treno", "Bus", "Aereo", "Nave"],
  },
  {
    name: "Giorni",
    count: 1,
    items: [
      "Lunedì",
      "Martedì",
      "Mercoledì",
      "Giovedì",
      "Venerdì",
      "Sabato",
      "Domenica",
    ],
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
    // "#" +
    Array.from(array, (dec) => dec.toString(36))
      .join("")
      .slice(0, 16)
  );
};

export default values;
