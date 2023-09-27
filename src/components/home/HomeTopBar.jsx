import moment from "moment";
import { BsCalendarEvent } from "react-icons/bs";
import { Link } from "react-router-dom";
import DateLine from "../basic/DateLine";
import Title from "../basic/Title";

export default function HomeTopBar({ user }) {
  const date = new Date();
  return (
    <>
      <Title title={`Bentornato, ${user?.firstName || ""}  `} />
      <div className="home-dateline">
        <div className="home-dateline-left">
          <strong>{moment(date).format("dddd, D MMMM YYYY")} </strong>
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
