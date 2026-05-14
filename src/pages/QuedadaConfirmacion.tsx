import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CalendarCheck, MessageSquare } from 'lucide-react';
import './QuedadaConfirmacion.css';

const MEMBERS = [
  { id: 1, handle: '@Ana_Ciclismo', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', confirmed: true },
  { id: 2, handle: '@Pedro_Corre', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', confirmed: true },
  { id: 3, handle: '@Marta_Fit', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', confirmed: true },
  { id: 4, handle: '@Juan_Madril', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', confirmed: true },
  { id: 5, handle: '¡Y TÚ!', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', confirmed: true, isUser: true },
];

const QuedadaConfirmacion: React.FC = () => {
  const navigate = useNavigate();
  const [addedToCalendar, setAddedToCalendar] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="confirmacion-container">
      <div className="header-nav">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ChevronLeft size={24} color="var(--text-primary)" />
        </button>
        <span className="title-nav">Confirmación de Quedada</span>
      </div>

      <div className="hero-banner">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Retiro Park" 
          className="hero-image" 
        />
        <div className="banner-overlay">
          <h2 className="success-message">¡TE HAS UNIDO A LA QUEDADA!</h2>
        </div>
      </div>

      <div className="details-section">
        <div className="details-text">
          <h3>Detalles de la Quedada:</h3>
          <h4 className="color-primary">"Retiro Park Run & Chat"</h4>
          <p>Sábado 24 de Julio, 18:00h</p>
          <p>Ubicación: Entrada Principal Parque del Retiro (Madrid)</p>
        </div>
        <div className="details-map">
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="Map" />
        </div>
      </div>

      <div className="members-section">
        <h3>Miembros Unidos</h3>
        <div className="members-list">
          {MEMBERS.map(member => (
            <div key={member.id} className="member-row">
              <img src={member.avatar} alt={member.handle} className="member-avatar" />
              <div className="member-info">
                <span className={member.isUser ? "color-primary font-bold" : "text-primary"}>
                  {member.handle}
                </span>
                <span className="confirmation-status">(Confirmado)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="actions-section">
        <button 
          className={`btn full-width-btn ${addedToCalendar ? 'btn-outline' : ''}`}
          onClick={() => setAddedToCalendar(true)}
          disabled={addedToCalendar}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          {addedToCalendar ? <CalendarCheck size={20} /> : null}
          {addedToCalendar ? '¡Añadido al Calendario!' : 'Añadir al Calendario'}
        </button>
        <div className="chat-prompt" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
          <p style={{ margin: 0 }}>Un chat de grupo se ha activado para esta quedada.</p>
          <button 
            className="btn" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 24px' }}
            onClick={() => showToast('Abriendo chat de grupo...')}
          >
            <MessageSquare size={18} />
            Ir al chat
          </button>
        </div>
      </div>

      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
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

export default QuedadaConfirmacion;
