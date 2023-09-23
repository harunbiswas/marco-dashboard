const values = {};

values.url = "http://localhost:5000";

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

export default values;
