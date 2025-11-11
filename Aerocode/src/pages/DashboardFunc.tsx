import React from "react";
import "../styles/CardSection.css";
import Subheader from "../components/subheader";
import CardFuncionario from "../components/cardfuncionario";

const DashboardFunc: React.FC = () => {
  return (
    <div className="dashboard">
      <Subheader />
      <CardFuncionario />
    </div>
  );
};

export default DashboardFunc;
