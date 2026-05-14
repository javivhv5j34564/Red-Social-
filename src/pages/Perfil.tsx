import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Play, UserPlus, UserCheck } from 'lucide-react';
import './Perfil.css';

const ACTIVITIES = [
  {
    id: 1,
    title: '10km Running (Retiro)',
    type: 'Racing',
    distance: '1.1 km',
    time: '5:02 km',
    media: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVideo: false
  },
  {
    id: 2,
    title: 'Bicycle Tour (Coastal)',
    type: 'Racing',
    distance: '507 km',
    time: '103.3 km',
    media: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVideo: false
  },
  {
    id: 3,
    title: '10km Running (Coastal)',
    type: 'Racing',
    distance: '1.1 km',
    time: '5:02 km',
    media: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVideo: true
  }
];

const TABS = ['Actividad', 'Estadísticas', 'Logros', 'Pachangas'];

const Perfil: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Actividad');
  const [isFollowing, setIsFollowing] = useState(false);
  const [expandedActivityId, setExpandedActivityId] = useState<number | null>(null);

  return (
    <div className="perfil-container">
      <div className="perfil-header-bg"></div>
      
      <div className="perfil-user-info">
        <div className="perfil-avatar-container">
          <img 
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
            alt="Marcos" 
            className="perfil-large-avatar" 
          />
        </div>
        <h2 className="perfil-name">Marcos</h2>
        
        <button 
          className={`btn ${isFollowing ? 'btn-outline' : ''}`} 
          style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 24px' }}
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? <UserCheck size={18} /> : <UserPlus size={18} />}
          {isFollowing ? 'Siguiendo' : 'Seguir'}
        </button>
        
        <div className="perfil-stats-row">
          <div className="perfil-stat">
            <span className="stat-value">312km</span>
            <span className="stat-label">Totales</span>
          </div>
          <div className="perfil-stat">
            <span className="stat-value">45</span>
            <span className="stat-label">Actividades</span>
          </div>
          <div className="perfil-stat">
            <span className="stat-value">
              <Activity size={20} color="var(--primary-color)" />
            </span>
            <span className="stat-label">Hito</span>
          </div>
        </div>
      </div>

      <div className="perfil-tabs">
        {TABS.map(tab => (
          <div 
            key={tab} 
            className={`perfil-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {activeTab === 'Actividad' && (
        <div className="perfil-activities">
          {ACTIVITIES.map(act => (
            <div key={act.id} className="perfil-activity-item" onClick={() => act.isVideo && navigate(`/post/${act.id}/comments`)} style={{ cursor: act.isVideo ? 'pointer' : 'default' }}>
              <div className="activity-details">
                <div className="activity-icon">
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="avatar" />
                </div>
                <div className="activity-texts">
                  <h4>{act.title}</h4>
                  <div className="activity-meta">
                    <span className="text-secondary">{act.type}</span>
                    <div className="meta-stats">
                      <span>Distancia: {act.distance}</span>
                      <span>Ritmo: {act.time}</span>
                    </div>
                    <span className="color-primary text-xs" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setExpandedActivityId(expandedActivityId === act.id ? null : act.id); }}>
                      {expandedActivityId === act.id ? 'Ocultar detalles' : 'Ver más'}
                    </span>
                  </div>
                  {expandedActivityId === act.id && (
                    <div className="activity-extra-details" style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      ¡Has superado tu marca personal en esta ruta por 15 segundos! Sigue así.
                    </div>
                  )}
                  </div>
                </div>
              <div className="activity-media">
                <img src={act.media} alt={act.title} />
                {act.isVideo && (
                  <div className="video-overlay-small">
                    <Play size={16} fill="#fff" color="#fff" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Estadísticas' && (
        <div className="perfil-stats-tab">
          <div className="stat-card">
            <h3>Este Mes</h3>
            <div className="stat-card-values">
              <div className="sc-val"><span className="sc-num">120</span><span className="sc-lbl">km</span></div>
              <div className="sc-val"><span className="sc-num">15</span><span className="sc-lbl">actividades</span></div>
            </div>
          </div>
          <div className="stat-card">
            <h3>Este Año</h3>
            <div className="stat-card-values">
              <div className="sc-val"><span className="sc-num">850</span><span className="sc-lbl">km</span></div>
              <div className="sc-val"><span className="sc-num">85</span><span className="sc-lbl">actividades</span></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Logros' && (
        <div className="perfil-achievements">
          <div className="achievement-item">
            <div className="achievement-icon">🏃</div>
            <div className="achievement-info">
              <h4>Primer Maratón</h4>
              <p>Completado el 12 de Octubre</p>
            </div>
          </div>
          <div className="achievement-item">
            <div className="achievement-icon">🔥</div>
            <div className="achievement-info">
              <h4>Racha de 7 días</h4>
              <p>Entrenaste 7 días seguidos</p>
            </div>
          </div>
          <div className="achievement-item locked">
            <div className="achievement-icon">🏔️</div>
            <div className="achievement-info">
              <h4>Escalador</h4>
              <p>Desnivel positivo de 5000m (Bloqueado)</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Pachangas' && (
        <div className="proximas-pachangas">
          <h3 className="section-title-left">Próximas Pachangas</h3>
          <div className="pachanga-card">
            <div className="pachanga-info">
              <h4>Fútbol 7 (Tercer Tiempo)</h4>
              <div className="pachanga-members">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="m1" />
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="m2" />
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="m3" />
              </div>
            </div>
            <button className="btn btn-outline" onClick={() => navigate('/quedadas/99/confirmacion')}>Sign up</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
