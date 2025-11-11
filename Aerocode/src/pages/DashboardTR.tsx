import React from "react";
import "../styles/CardSection.css";
import CardRelatorio from "../components/cardrelatorio";
import Subheader from "../components/subheader";

const DashboardTR: React.FC = () => {
  return (
    <div className="dashboard">
      <Subheader />
      <CardRelatorio />
    </div>
  );
};

export default DashboardTR;
