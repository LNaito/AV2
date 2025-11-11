import React from "react";
import "../styles/CardSection.css";

interface CardSectionProps {
  title: string;
  onCreate?: () => void;
  children: React.ReactNode;
}

const CardSection: React.FC<CardSectionProps> = ({ title, children }) => {
  return (
    <div className="card-section">
      <div className="card-section-header">
        <h2>{title}</h2>
      </div>
      <div className="card-section-content">{children}</div>
    </div>
  );
};

export default CardSection;
