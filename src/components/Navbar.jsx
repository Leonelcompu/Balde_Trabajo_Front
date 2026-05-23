import { useState } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';

// Importamos AMBAS imágenes desde la carpeta assets
import baldeTexto from '../assets/BaldeLogo.png'; // La imagen nueva con las letras
import logoImg from '../assets/logo.png';         // La imagen del balde que ya tenías

export const Navbar = ({ cartCount, onSearch, onOpenCart }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  return (
    <header className="navbar">
      {/* Contenedor del Logo con las dos imágenes */}
      <div className="logo-container">
        <img src={baldeTexto} alt="BALDE Texto" className="navbar-text-img" />
        <img src={logoImg} alt="BALDE Icono" className="navbar-logo-img" />
      </div>

      <div className="search-bar">
        <span className="search-icon">
          <FaSearch color="#aaa" />
        </span>
        <input 
          type="text" 
          placeholder="Buscar juego y presionar Enter..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="cart-container" onClick={onOpenCart} style={{ cursor: 'pointer' }}>
        <div className="nav-box">Mi Biblioteca</div>
        <div className="nav-box cart-box" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaShoppingCart size={18} color="#e5c07b" /> 
          <span className="cart-count">{cartCount}</span>
        </div>
      </div>
    </header>
  );
};