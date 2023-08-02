import { Route, Routes } from "react-router-dom";
import Booking from "../pages/Booking";
import Home from "../pages/Home";

export default function Root() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="booking" element={<Booking />} />
    </Routes>
  );
}
