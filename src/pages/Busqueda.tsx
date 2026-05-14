import React, { useState } from 'react';
import { Search, MapPin, Play } from 'lucide-react';
import './Busqueda.css';

const ZONAS = [
  { id: 1, name: 'El Retiro - Running', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Local Gym - Yoga', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Coastal Path - Cycle', image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Mountain - Hiking', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
];

const VIDEOS = [
  { id: 1, name: 'Madrid Río - 10k', image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Guadarrama - Bici', image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
];

const PERSONAS = [
  { id: 1, name: 'Alex', distance: '1.2 km', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
  { id: 2, name: 'Sara', distance: '3 km', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
  { id: 3, name: 'David', distance: '5 km', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }
];

const Busqueda: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todo');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredZonas = ZONAS.filter(z => z.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredVideos = VIDEOS.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredPersonas = PERSONAS.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="busqueda-container">
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <Search size={20} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Buscar gente, vídeos, zonas..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <div onClick={() => setSearchTerm('')} style={{ display: 'flex', cursor: 'pointer', padding: '4px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: '1' }}>×</span>
            </div>
          )}
        </div>

        <div className="search-categories">
          {['Todo', 'Zonas', 'Vídeos', 'Personas'].map(cat => (
            <div 
              key={cat} 
              className={`search-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      {(activeCategory === 'Todo' || activeCategory === 'Zonas') && (
        <section className="search-section" style={{ animation: 'fadeInUp 0.3s ease' }}>
          <div className="section-header">
            <MapPin size={20} color="var(--primary-color)" />
            <h3>Zonas Populares</h3>
          </div>
          <div className="zonas-grid">
            {filteredZonas.map(zona => (
              <div key={zona.id} className="zona-card" onClick={() => showToast(`Explorando ${zona.name}`)}>
                <img src={zona.image} alt={zona.name} />
                <div className="zona-label">{zona.name}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {(activeCategory === 'Todo' || activeCategory === 'Vídeos') && (
        <section className="search-section" style={{ animation: 'fadeInUp 0.4s ease' }}>
          <div className="section-header">
            <Play size={20} color="var(--primary-color)" />
            <h3>Vídeos de Rutas</h3>
          </div>
          <div className="horizontal-scroll">
            {filteredVideos.map(video => (
              <div key={video.id} className="video-card" onClick={() => showToast(`Reproduciendo ${video.name}`)}>
                <img src={video.image} alt={video.name} />
                <div className="video-overlay">
                  <Play size={24} fill="#fff" color="#fff" />
                </div>
                <div className="video-label">{video.name}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {(activeCategory === 'Todo' || activeCategory === 'Personas') && (
        <section className="search-section" style={{ animation: 'fadeInUp 0.5s ease' }}>
          <div className="section-header">
            <h3>Personas Cerca</h3>
          </div>
          <div className="horizontal-scroll">
            {filteredPersonas.map(persona => (
              <div key={persona.id} className="persona-card" onClick={() => showToast(`Viendo perfil de ${persona.name}`)}>
                <img src={persona.avatar} alt={persona.name} className="persona-avatar" />
                <span className="persona-name">{persona.name}</span>
                <span className="persona-distance">{persona.distance}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: 'var(--text-primary)', color: 'var(--bg-color)', padding: '10px 20px',
          borderRadius: '24px', fontSize: '14px', zIndex: 1000, boxShadow: 'var(--shadow-md)',
          animation: 'fadeInUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
        }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Busqueda;
