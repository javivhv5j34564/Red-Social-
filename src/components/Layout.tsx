import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, FileText, ArrowLeftRight, User, Menu, Bell, X, Settings, HelpCircle, LogOut } from 'lucide-react';
import './Layout.css';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="app-container">
      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="st-logo sidebar-logo">
            <span>F</span>
            <span style={{ marginTop: '-4px' }}>T</span>
          </div>
          <span style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-color)', marginLeft: '12px', flex: 1, letterSpacing: '0.5px' }}>FitTribe</span>
          <button className="close-sidebar" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} color="var(--text-primary)" />
          </button>
        </div>
        
        <div className="sidebar-content">
          <div className="sidebar-user">
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
              alt="Profile" 
              className="avatar large"
            />
            <div className="sidebar-user-info">
              <h3>Alex Runner</h3>
              <p>@alexrunner</p>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <NavLink to="/perfil" className="sidebar-item" onClick={() => setIsSidebarOpen(false)}>
              <User size={20} />
              <span>Mi Perfil</span>
            </NavLink>
            <div className="sidebar-item">
              <Settings size={20} />
              <span>Configuración</span>
            </div>
            <div className="sidebar-item">
              <HelpCircle size={20} />
              <span>Ayuda y Soporte</span>
            </div>
          </nav>
        </div>
        
        <div className="sidebar-footer">
          <button className="sidebar-item logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      <header className="top-header">
        <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} color="var(--text-secondary)" />
        </button>
        
        <div className="logo-center">
          <div className="st-logo">
            <span>F</span>
            <span style={{ marginTop: '-4px' }}>T</span>
          </div>
        </div>
        
        <div className="header-right flex-row gap-3">
          <Bell size={20} color="var(--text-secondary)" />
          <img 
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
            alt="Profile" 
            className="avatar"
            width={28}
            height={28}
            onClick={() => navigate('/perfil')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </header>

      <main className="scrollable-content">
        <Outlet />
      </main>

      <nav className="bottom-nav">
        <NavLink to="/home" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Home size={24} />
        </NavLink>
        <NavLink to="/quedadas" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FileText size={24} />
        </NavLink>
        <NavLink to="/busqueda" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <ArrowLeftRight size={24} />
        </NavLink>
        <NavLink to="/perfil" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <User size={24} />
        </NavLink>
      </nav>
    </div>
  );
};

export default Layout;
