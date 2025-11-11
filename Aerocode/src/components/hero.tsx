import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';

const HeroSection: React.FC = () => {
  return (
    <section id="inicio" className="hero-section">

      <div className="hero__text-content">
        <h1 className="hero__title">Aerocode</h1>
        <p className="hero__subtitle">Gerencie os céus.</p>
        
        <div className="hero__description">
          <p>
            Na Aerocode, gerencie aeronaves e seus processos em um lugar só de maneira fácil, rápida e intuitiva para você e seus funcionários.
          </p>
        </div>
        <Link to="/login" className="hero__cta-button">
          Comece agora
        </Link>
        </div>
    </section>
  );
};

export default HeroSection;
