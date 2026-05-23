import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { GameShowcase } from './components/GameShowcase';
import { CartModal } from './components/CartModal'; // NUEVO IMPORT
import './App.css';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('balde_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  // NUEVO ESTADO: Controla si la ventana del carrito está abierta o cerrada
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('balde_cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="app-container">
      {/* Le pasamos a Navbar la función para ABRIR el modal */}
      <Navbar 
        cartCount={cart.length} 
        onSearch={setSearchTerm} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <main className="main-content">
        <GameShowcase cart={cart} setCart={setCart} searchTerm={searchTerm} />
      </main>

      {/* NUEVO: Agregamos el componente Modal */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        setCart={setCart} 
      />
    </div>
  );
}

export default App;