import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import './Quedadas.css';

const MOCK_MEETUPS = [
  {
    id: 1,
    title: 'Running Group',
    time: '7:00 PM',
    members: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    ]
  },
  {
    id: 2,
    title: 'Yoga in the Park',
    time: '6:30 PM',
    members: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    ]
  },
  {
    id: 3,
    title: 'Bicycle Tour',
    time: '8:00 AM',
    members: [
      '/marcos.jpg'
    ]
  }
];

const Quedadas: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMeetups = MOCK_MEETUPS.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="quedadas-container">
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
        </div>
      </div>

      <h2 className="page-title">Buscar Actividades (La Pachanga)</h2>

      <div className="map-container">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Map placeholder" 
          className="map-image" 
        />
        
        {/* Map Overlays/Markers */}
        <div className="map-marker" style={{ top: '30%', left: '20%' }}>
          <div className="marker-icon"><MapPin size={24} color="#000" fill="var(--primary-color)"/></div>
        </div>
        <div className="map-marker" style={{ top: '60%', right: '30%' }}>
          <div className="marker-icon"><MapPin size={24} color="#000" fill="var(--primary-color)"/></div>
          <div className="marker-label">
            Fútbol 7 <br />
            <span className="text-xs text-secondary">(Buscando gente)</span>
          </div>
        </div>
      </div>

      <div className="meetups-list">
        {filteredMeetups.map(meetup => (
          <div key={meetup.id} className="meetup-item">
            <div className="meetup-info">
              <h3 className="meetup-title">{meetup.title} - {meetup.time}</h3>
              <div className="meetup-members">
                {meetup.members.map((avatar, i) => (
                  <img key={i} src={avatar} alt="Member" className="member-avatar" />
                ))}
              </div>
            </div>
            <button 
              className="btn btn-outline" 
              onClick={() => navigate(`/quedadas/${meetup.id}/confirmacion`)}
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quedadas;
