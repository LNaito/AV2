import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          &copy; {currentYear} Aerocode. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;