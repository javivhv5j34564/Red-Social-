import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Send, Heart, Play, Pause } from 'lucide-react';
import './Comentarios.css';

const INITIAL_COMMENTS = [
  { id: 1, user: '@Ana_Ciclismo', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', text: '¡Vaya rutón! Espectacular el paisaje. ¿Cuál es la ruta exacta?', likes: 150 },
  { id: 2, user: '@Pedro_Corre', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', text: 'Increíble la calidad del vídeo y la música. Muy motivador. ¡Gracias por compartir!', likes: 98 },
  { id: 3, user: '@Juan_Madril', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', text: 'He corrido esa zona muchas veces y es brutal. ¡Bravo!', likes: 65 },
  { id: 4, user: '@Marta_Fit', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', text: '¡Gran entrenamiento! Se nota la dedicación.', likes: 42 }
];

const Comentarios: React.FC = () => {
  const navigate = useNavigate();
  useParams(); // Para cuando se conecte al microservicio
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: '@Tú',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', // User's avatar
      text: newComment,
      likes: 0
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const toggleLike = (commentId: number) => {
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return { ...c, likes: c.likes + 1 }; // Simplificado para simular el click
      }
      return c;
    }));
  };

  return (
    <div className="comentarios-container">
      <div className="video-header-nav">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ChevronLeft size={24} color="#fff" />
        </button>
        <span className="video-title-nav">Comentarios del Video - "Unidos por el deporte"</span>
      </div>

      <div className="video-player-container">
        <img 
          src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Video Thumbnail" 
          className="video-thumbnail" 
        />
        <div className="video-controls-overlay" onClick={() => setIsPlaying(!isPlaying)}>
          <div className="play-pause-btn">
            {isPlaying ? <Pause size={32} fill="#fff" color="#fff" /> : <Play size={32} fill="#fff" color="#fff" />}
          </div>
          
          <div className="video-progress-bar">
            <div className="progress-fill" style={{ width: '45%' }}></div>
            <div className="progress-thumb"></div>
          </div>
        </div>
      </div>

      <div className="comments-section">
        <h3 className="comments-count">Comentarios ({comments.length})</h3>
        
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <img src={comment.avatar} alt={comment.user} className="comment-avatar" />
              <div className="comment-content">
                <div className="comment-user">
                  <span className="user-handle">{comment.user}</span>
                  {comment.id === 1 && <span className="user-badge">⭐</span>}
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
              <div className="comment-actions">
                <button onClick={() => toggleLike(comment.id)} className="like-btn">
                  <Heart size={14} color="var(--primary-color)" fill={comment.likes > 0 ? "var(--primary-color)" : "none"} />
                  <span>{comment.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="comment-input-container">
        <form onSubmit={handleSend} className="comment-form">
          <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Tu avatar" className="input-avatar" />
          <input 
            type="text" 
            placeholder="Escribe un comentario..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="comment-input" 
          />
          <button type="submit" className="send-btn" disabled={!newComment.trim()}>
            <Send size={20} color={newComment.trim() ? "var(--primary-color)" : "var(--text-secondary)"} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comentarios;
