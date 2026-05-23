import { useState, useEffect } from 'react';
// Importamos los íconos profesionales de FontAwesome (fa)
import { FaEdit, FaTrash, FaStar, FaUserCircle, FaPaperPlane } from 'react-icons/fa';

export const ReviewSection = ({ gameID }) => {
  const [reviews, setReviews] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedReviews = localStorage.getItem(`reviews_${gameID}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      // ACÁ CAMBIAMOS A DON TULIO: Si no hay reseñas, carga este usuario por defecto
      setReviews([{ 
        id: 1, 
        author: 'Gordon Freeman', 
        text: 'Una obra maestra absoluta de la ciencia ficción.', 
        rating: 5 
      }]);
    }
  }, [gameID]);

  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem(`reviews_${gameID}`, JSON.stringify(reviews));
    }
  }, [reviews, gameID]);

  const handleSubmit = () => {
    if (inputText.trim() === '') return;

    if (editingId) {
      const updatedReviews = reviews.map(rev => 
        rev.id === editingId ? { ...rev, text: inputText } : rev
      );
      setReviews(updatedReviews);
      setEditingId(null);
    } else {
      const newReview = {
        id: Date.now(),
        author: 'Mi Usuario',
        text: inputText,
        rating: 5
      };
      setReviews([...reviews, newReview]);
    }
    setInputText('');
  };

  const handleDelete = (idToRemove) => {
    const filteredReviews = reviews.filter(rev => rev.id !== idToRemove);
    setReviews(filteredReviews);
    if (filteredReviews.length === 0) {
      localStorage.removeItem(`reviews_${gameID}`);
    }
  };

  const handleEdit = (review) => {
    setInputText(review.text);
    setEditingId(review.id);
  };

  return (
    <div className="review-section">
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              {/* Reemplazamos los emojis de estrellas por íconos reales */}
              <div className="stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <div className="review-actions">
                <button onClick={() => handleEdit(review)}><FaEdit size={16} /></button>
                <button onClick={() => handleDelete(review.id)}><FaTrash size={16} /></button>
              </div>
            </div>
            {/* Ícono de usuario en lugar del emoji */}
            <div className="review-author" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <FaUserCircle size={18} /> {review.author}
            </div>
            <p className="review-text">{review.text}</p>
          </div>
        ))}
      </div>

      <div className="review-input-box">
        <input 
          type="text" 
          placeholder={editingId ? "Editando tu reseña..." : "Escribe tu reseña aquí..."}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        {/* Cambiamos la flecha fea por un avioncito de papel profesional */}
        <button onClick={handleSubmit}>
          {editingId ? "Actualizar" : <FaPaperPlane size={18} color="#3b5998" />}
        </button>
      </div>
    </div>
  );
};