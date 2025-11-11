import React from "react";
import "../styles/CardSection.css";
import CardAeronave from "../components/cardaeronave";
import CardPeca from "../components/cardpeca";
import CardEtapa from "../components/cardetapa";
import Subheader from "../components/subheader";

const DashboardAero: React.FC = () => {
  return (
    <div className="dashboard">
      <Subheader />
      <CardAeronave />
      <CardPeca />
      <CardEtapa />
    </div>
  );
};

export default DashboardAero;
