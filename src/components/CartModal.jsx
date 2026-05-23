export const CartModal = ({ isOpen, onClose, cart, setCart }) => {
  // Si isOpen es falso, no renderizamos nada (el modal está oculto)
  if (!isOpen) return null;

  // Función para borrar un juego específico desde el carrito
  const handleRemove = (gameIDToRemove) => {
    const newCart = cart.filter((item) => item.gameID !== gameIDToRemove);
    setCart(newCart);
  };

  // Calculamos el precio total sumando los precios de los juegos en el carrito
  const total = cart.reduce((sum, item) => sum + parseFloat(item.salePrice), 0).toFixed(2);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Mi Biblioteca / Carrito</h2>
          <button onClick={onClose} className="close-btn">X</button>
        </div>
        
        <div className="modal-body">
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>Tu biblioteca está vacía. ¡Ve a comprar algo!</p>
          ) : (
            cart.map((game) => (
              <div key={game.gameID} className="cart-item">
                <img src={game.thumb} alt={game.title} className="cart-thumb" />
                <div className="cart-item-info">
                  <h4>{game.title}</h4>
                  <p>${game.salePrice}</p>
                </div>
                <button onClick={() => handleRemove(game.gameID)} className="remove-btn">🗑️ Quitar</button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="modal-footer">
            <h3>Total a pagar: ${total}</h3>
          </div>
        )}
      </div>
    </div>
  );
};