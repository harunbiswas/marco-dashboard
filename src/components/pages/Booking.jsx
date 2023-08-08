import { useEffect, useRef, useState } from "react";
import { BsCalendarEvent } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { HiOutlineDownload } from "react-icons/hi";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import values from "../../../values";
import DateLine from "../basic/DateLine";
import Search from "../basic/Search";
import Select from "../basic/Select";
import Title from "../basic/Title";
import AddBtn from "../booking/AddBtn";
import BookingMneu from "../booking/BookingMenu";
import Filter from "../booking/Filter";
import Pagenation from "../booking/Pagenation";
import QuoteDetails from "../booking/QuoteDetails";
import Table from "../booking/Table";
import TableUser from "../booking/TableUser";
import UserDetails from "../booking/UserDetails";

export default function Booking() {
  const [activePage, setActivePage] = useState("booking");
  const [isFilter, setIsFilter] = useState(false);
  const filter = useRef(null);
  const [isDetails, setIsDetails] = useState(false);
  const [isIndex, setIsIndex] = useState(null);
  const table = useRef(null);

  const closeHandler = () => {
    setIsFilter(false);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (table.current && !table.current.contains(e.target)) {
        setIsIndex(false);
      }
    });
  });

  // key up down handler

  const handleKeyDown = (event) => {
    if (event.keyCode === 38) {
      // Arrow up key (move selection up)
      if (isIndex > 0) {
        setIsIndex((prev) => {
          return prev - 1;
        });
      }
    } else if (event.keyCode === 40) {
      // Arrow down key (move selection down)
      if (
        (activePage === "booking" && isIndex < values.requestTD.length - 1) ||
        isIndex < values.userTD.length - 1
      )
        setIsIndex((prev) => {
          return prev + 1;
        });
    }
  };

  useEffect(() => {
    if (isIndex || isIndex === 0) {
      // Attach the keydown event listener when the component mounts
      window.addEventListener("keydown", handleKeyDown);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the pressed key is the arrow down key (key code 40)
      if (event.keyCode === 40 || event.keyCode === 38) {
        event.preventDefault(); // Prevent the default scrolling behavior
        // Your custom handling for the arrow down key press can go here
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (filter.current && !filter.current.contains(e.target)) {
        setIsFilter(false);
      }
    });
  }, []);

  return (
    <div className="booking">
      <div className="container">
        <div className="booking-box">
          <div className="booking-top">
            <div className="booking-top-left">
              <div className="info">
                <Title title="Recent Request" />
                <div className="booking-top-left-btns">
                  <button
                    onClick={() => {
                      setActivePage("booking");
                      setIsDetails(false);
                    }}
                    className={(activePage === "booking" && "active") || ""}
                  >
                    Booking Details
                  </button>
                  <button
                    onClick={() => {
                      setActivePage("user");
                      setIsDetails(false);
                    }}
                    className={(activePage === "user" && "active") || ""}
                  >
                    User Details
                  </button>
                </div>
              </div>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece
              </p>
            </div>
            <div className="booking-top-right">
              <button className="export-btn">
                <HiOutlineDownload />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
          <BookingMneu />
          <div className="booking-filter">
            <Search />
            <div className="booking-filters">
              <AddBtn />
              <div className="sort booking-btn">
                <div className="icon">
                  <HiMiniBars3BottomLeft />
                </div>

                <Select data={["Sort", "Top", "Bottom"]} />
              </div>
              <div ref={filter} className=" booking-btn filter-btn-wrp">
                <button
                  onClick={() => {
                    setIsFilter(!isFilter);
                  }}
                  className="filter-btn"
                >
                  <div className="icon">
                    <FiFilter />
                  </div>

                  <p>Filters</p>
                  <span>2</span>
                </button>

                {isFilter && <Filter handler={closeHandler} />}
              </div>
              <DateLine
                data={[
                  "Today",
                  " Last day",
                  "Last 7 days",
                  "Last Month",
                  "Last Year",
                ]}
                defaultText="show:"
                icon={<BsCalendarEvent />}
              />
            </div>
          </div>
          <div ref={table} className="booking-table">
            {(activePage === "booking" && (
              <>
                {" "}
                <Table
                  data={{
                    th: values.requestTH,
                    td: values.requestTD,
                    detailsHandler: setIsDetails,
                    isIndex: isIndex,
                    setIsIndex,
                    isDetails,
                  }}
                />
                <QuoteDetails
                  isDetails={isDetails}
                  isIndex={isIndex}
                  handler={setIsDetails}
                  isUser={true}
                />
              </>
            )) || (
              <>
                <TableUser
                  data={{
                    th: values.userTH,
                    td: values.userTD,
                    detailsHandler: setIsDetails,
                    isIndex: isIndex,
                    setIsIndex,
                    isDetails,
                  }}
                />
                <UserDetails
                  isDetails={isDetails}
                  isIndex={isIndex}
                  handler={setIsDetails}
                  setIsIndex
                  quate={true}
                />
              </>
            )}
          </div>

          <Pagenation />
        </div>
      </div>
    </div>
  );
}
