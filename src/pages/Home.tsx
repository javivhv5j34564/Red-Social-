import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Play, ChevronRight, Activity, MapPin, BadgeCheck, Clock } from 'lucide-react';
import './Home.css';

const INITIAL_POSTS = [
  {
    id: 1,
    user: { name: 'John', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    action: 'ran 10km at 5:15 pace.',
    stats: { type: 'Racing', distance: '10 km', time: '52:30' },
    media: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isVideo: false,
    likes: 110,
    comments: 24,
    tags: ['Martorell'],
    likedByMe: false
  },
  {
    id: 2,
    user: { name: 'Ana', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    action: 'completed a cycling route.',
    stats: { type: 'Cycling', distance: '45 km', time: '2:15:00' },
    media: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isVideo: true,
    likes: 342,
    comments: 56,
    tags: ['Bici'],
    likedByMe: true
  },
  {
    id: 3,
    user: { name: 'Carlos', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    action: 'had a great swimming session.',
    stats: { type: 'Swimming', distance: '2 km', time: '45:00' },
    media: 'https://images.unsplash.com/photo-1519315901367-f34f927423d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isVideo: false,
    likes: 89,
    comments: 12,
    tags: ['Piscina', 'Natación'],
    likedByMe: false
  },
  {
    id: 4,
    user: { name: 'Maria', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    action: 'did a morning yoga routine.',
    stats: { type: 'Yoga', distance: '0 km', time: '1:00:00' },
    media: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isVideo: false,
    likes: 215,
    comments: 31,
    tags: ['Relax', 'Flexibilidad'],
    likedByMe: true
  },
  {
    id: 5,
    user: { name: 'David', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    action: 'crushed a CrossFit WOD.',
    stats: { type: 'CrossFit', distance: '0 km', time: '40:00' },
    media: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isVideo: true,
    likes: 450,
    comments: 89,
    tags: ['WOD', 'Fuerza'],
    likedByMe: false
  },
  {
    id: 6,
    user: { name: 'Laura', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    action: 'went hiking in the mountains.',
    stats: { type: 'Hiking', distance: '12 km', time: '3:30:00' },
    media: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isVideo: false,
    likes: 320,
    comments: 45,
    tags: ['Montaña', 'Naturaleza'],
    likedByMe: true
  },
  {
    id: 7,
    user: { name: 'Marcos', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    action: 'played an intense padel match.',
    stats: { type: 'Padel', distance: '5 km', time: '1:30:00' },
    media: 'https://images.unsplash.com/photo-1622279457486-640ca4a4ab6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isVideo: true,
    likes: 180,
    comments: 28,
    tags: ['Pádel', 'Torneo'],
    likedByMe: false
  },
  {
    id: 8,
    user: { name: 'Elena', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    action: 'hit a new PR at the gym.',
    stats: { type: 'Gym', distance: '0 km', time: '1:15:00' },
    media: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isVideo: false,
    likes: 275,
    comments: 34,
    tags: ['PR', 'Pesas'],
    likedByMe: true
  },
  {
    id: 9,
    user: { name: 'Javier', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    action: 'ran a half marathon.',
    stats: { type: 'Running', distance: '21.1 km', time: '1:45:12' },
    media: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isVideo: false,
    likes: 512,
    comments: 76,
    tags: ['MediaMaratón', 'Finisher'],
    likedByMe: false
  },
  {
    id: 10,
    user: { name: 'Sofia', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    action: 'completed a pilates class.',
    stats: { type: 'Pilates', distance: '0 km', time: '50:00' },
    media: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isVideo: false,
    likes: 198,
    comments: 15,
    tags: ['Pilates', 'Core'],
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="post-user-name">{post.user.name}</span>
                  {(post.id % 3 === 0 || post.user.name === 'Marcos') && (
                    <BadgeCheck size={16} color="#fff" fill="var(--primary-color)" />
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <span className="post-action">{post.action}</span>
                  <span>•</span>
                  <Clock size={12} />
                  <span>Hace {post.id}h</span>
                </div>
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
