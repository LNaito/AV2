import React from "react";
import "../styles/Subheader.css";
import DivAviao from "../assets/DivAviao.png"; 
import { Link } from "react-router-dom";

const Subheader: React.FC = () => {
  return (
    <div className="subheader-container">
      <div className="subheader-links">
        <Link to="/DashboardAero" className="subheader-item">Aeronaves</Link>
        <Link to="/DashboardFunc" className="subheader-item">Funcionários</Link>
        <Link to="/DashboardTR"className="subheader-item">Testes e Relatórios</Link>
      </div>
      <div className="subheader-divider">
        <img src={DivAviao} alt="Linha com avião" className="subheader-aviao" />
      </div>
    </div>
  );
};

export default Subheader;
