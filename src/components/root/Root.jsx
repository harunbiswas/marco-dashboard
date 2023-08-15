import { Route, Routes } from "react-router-dom";
import Booking from "../pages/Booking";
import Home from "../pages/Home";
import Hotel from "../pages/Hotel";
import HotelDetails from "../pages/HotelDetails";

export default function Root() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="booking" element={<Booking />} />
      <Route path="hotel" element={<Hotel />} />
      <Route path="hotel/:id" element={<HotelDetails />} />
    </Routes>
  );
}
