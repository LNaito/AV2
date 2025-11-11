import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => { 
  return (
    <header className="header">
      <Link to="/" className="header__logo">Aerocode</Link>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/login">Entrar</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
