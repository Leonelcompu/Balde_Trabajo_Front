import { useState, useEffect } from 'react';
import { ReviewSection } from './ReviewSection';

// Recibimos 'searchTerm' desde App.jsx
export const GameShowcase = ({ cart, setCart, searchTerm }) => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  // Este useEffect ahora responde a lo que pide el usuario depende del searchTerm.
  // Si searchTerm cambia, se vuelve a ejecutar.
  useEffect(() => {
    setLoading(true);
    
    // Armamos la URL. Si hay búsqueda, agregamos el título. Si no, traemos la oferta general.
    let url = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=1';
    if (searchTerm) {
      url = `https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=1&title=${searchTerm}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // CheapShark devuelve un array []. Verificamos si encontró algo.
        if (data.length > 0) {
          setGame(data[0]);
        } else {
          alert("No se encontró ningún juego con ese nombre");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al traer la API:", error);
        setLoading(false);
      });
  }, [searchTerm]);

  // Funciones del Carrito (CRUD)
  const handleAddToCart = () => {
    const alreadyInCart = cart.some((item) => item.gameID === game.gameID);
    if (alreadyInCart) {
      alert("¡Este juego ya está en tu carrito!");
    } else {
      setCart([...cart, game]);
      alert("¡Juego añadido a la biblioteca!");
    }
  };

  const handleDelete = () => {
    const newCart = cart.filter((item) => item.gameID !== game.gameID);
    setCart(newCart);
    alert("Juego eliminado del carrito");
  };
   // boton update actualiza el precio de oferta
  const handleUpdate = () => {
    // Calculamos un descuento del 20%
    const nuevoPrecio = (parseFloat(game.salePrice) * 0.8).toFixed(2);
    // Actualizamos el estado
    setGame({ ...game, salePrice: nuevoPrecio });
    alert("¡Descuento aplicado! Precio actualizado.");
  };
  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center' }}>Cargando oferta del día...</div>;
  }

  return (
    <section className="game-showcase">
      {/* Columna Izquierda: Portada, Título y Descripción */}
      <div className="game-image-section">
        <div className="image-wrapper">
          <span className="arrow">◀</span>
          <img src={game.thumb} alt={game.title} className="game-cover" />
          <span className="arrow">▶</span>
        </div>
        
        <div className="game-year" style={{ width: 'auto', padding: '5px 15px' }}>
          {game.title}
        </div>

        <div className="game-description">
          <p>
            Nombrado juego del año por más de 50 publicaciones, la ópera prima 
            mezcla acción y aventuras con una tecnología galardonada con varios premios, 
            en un mundo terriblemente realista en el que los jugadores deberán 
            esforzarse por sobrevivir.
          </p>
        </div>
      </div>

      {/* Columna Derecha: Tags, Precios, Botones y RESEÑAS */}
      <div className="game-details-section">
        <div className="tags">TAGS: [OFERTA] [STEAM]</div>
        
        <div className="purchase-box">
          <div className="price-display">
            <h2>${game.salePrice}</h2>
          </div>
          
          <div className="crud-buttons">
            <button className="btn-add" onClick={handleAddToCart}>añadir 🛒</button>
            <button className="btn-delete" onClick={handleDelete}>borrar</button>
            <button className="btn-update" onClick={handleUpdate}>update</button>
          </div>
        </div>

        {/* Apartado de las reseñas de los juegos */}
        <div style={{ marginTop: '30px' }}>
          <ReviewSection gameID={game.gameID} />
        </div>
        
      </div>
    </section>
  );
};
