import React from "react";
import "../styles/Dashboard/dashboard.scss";
import EmployeeCard from "./EmployeeCard";
import EmployeeFilter from "./EmployeeFilter";
import EmployeeHeading from "./EmployeeHeading";
const EmployeeList = () => {
  return (
    <div className="employee_list">
      <EmployeeHeading />
      <EmployeeFilter />

      {/* Employees Card */}
      <React.Fragment>
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
      </React.Fragment>
    </div>
  );
};

export default EmployeeList;
