import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Play, ChevronRight, Activity, MapPin } from 'lucide-react';
import './Home.css';

const INITIAL_POSTS = [
  {
    id: 1,
    user: {
      name: 'John',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    action: 'ran 10km at 5:15 pace.',
    stats: {
      type: 'Racing',
      distance: '10 km',
      time: '52:30'
    },
    media: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isVideo: false,
    likes: 110,
    comments: 24,
    tags: ['Martorell'],
    likedByMe: false
  },
  {
    id: 2,
    user: {
      name: 'Ana',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    action: 'completed a cycling route.',
    stats: {
      type: 'Cycling',
      distance: '45 km',
      time: '2:15:00'
    },
    media: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isVideo: true,
    likes: 342,
    comments: 56,
    tags: ['Bici'],
    likedByMe: true
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(INITIAL_POSTS);

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likedByMe: !post.likedByMe,
          likes: post.likedByMe ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleShare = () => {
    showToast('¡Enlace copiado al portapapeles!');
  };

  return (
    <div className="home-container">
      <div className="feed-header">
        <h2 className="section-title">Unidos por el deporte</h2>
      </div>

      <div className="feed">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <img src={post.user.avatar} alt={post.user.name} className="post-avatar" />
              <div className="post-user-info">
                <span className="post-user-name">{post.user.name}</span>
                <span className="post-action">{post.user.name} {post.action}</span>
              </div>
              <ChevronRight size={20} color="var(--text-secondary)" className="post-more" style={{ cursor: 'pointer' }} onClick={() => showToast('Opciones del post')} />
            </div>

            <div className="post-stats-preview">
              <div className="stat-item">
                <Activity size={16} color="var(--primary-color)" />
                <span>{post.stats.distance}</span>
              </div>
              <div className="stat-item">
                <MapPin size={16} color="var(--primary-color)" />
                <span>{post.stats.time}</span>
              </div>
            </div>

            <div className="post-media-container" onClick={() => navigate(`/post/${post.id}/comments`)}>
              <img src={post.media} alt="Post content" className="post-media" />
              {post.isVideo && (
                <div className="video-play-overlay">
                  <Play size={40} fill="#fff" color="#fff" />
                </div>
              )}
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="post-tag">{tag}</span>
                ))}
              </div>
              <div className="post-likes-overlay">
                <Heart size={16} fill={post.likedByMe ? "var(--primary-color)" : "var(--text-primary)"} color={post.likedByMe ? "var(--primary-color)" : "var(--text-primary)"} />
                <span>{post.likes}</span>
              </div>
            </div>

            <div className="post-actions">
              <button className={`action-btn ${post.likedByMe ? 'active-action' : ''}`} onClick={() => toggleLike(post.id)}>
                <Heart size={20} color={post.likedByMe ? "var(--primary-color)" : "currentColor"} fill={post.likedByMe ? "var(--primary-color)" : "none"} />
                <span style={{ color: post.likedByMe ? "var(--primary-color)" : "inherit" }}>Reacciones</span>
              </button>
              <button className="action-btn" onClick={() => navigate(`/post/${post.id}/comments`)}>
                <MessageCircle size={20} />
                <span>Comentarios ({post.comments})</span>
              </button>
              <button className="action-btn" onClick={handleShare}>
                <Share2 size={20} />
                <span>Compartir</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: 'var(--text-primary)', color: 'white', padding: '10px 20px',
          borderRadius: '24px', fontSize: '14px', zIndex: 1000, boxShadow: 'var(--shadow-md)',
          animation: 'fadeInOut 0.3s ease'
        }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Home;
