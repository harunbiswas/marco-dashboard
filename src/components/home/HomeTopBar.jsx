import { useContext } from "react";
import { BsCalendarEvent } from "react-icons/bs";
import { Link } from "react-router-dom";
import DateLine from "../basic/DateLine";
import Title from "../basic/Title";
import ThemeContext from "../context/ThemeContext";

export default function HomeTopBar() {
  const date = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
    localeMatcher: "best fit",
  };

  const formattedDate = new Intl.DateTimeFormat("it-IT", options).format(date);

  const { user } = useContext(ThemeContext);

  return (
    <>
      <Title title={`Bentornato, ${user?.firstName || ""}  `} />
      <div className="home-dateline">
        <div className="home-dateline-left">
          <strong>{formattedDate}. </strong>
          <span>
            Hai 0 nuovi preventivi richiesti, clicca per controllare su{"   "}
            <Link to="booking"> Preventivi Richiesti</Link>
          </span>
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
    </>
  );
}
