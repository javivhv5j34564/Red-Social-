import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <span className="app-subtitle">Unidos por el deporte</span>
      </div>

      <div className="login-logo-container">
        <div className="login-st-logo">
          <span>S</span>
          <span style={{ marginTop: '-8px' }}>T</span>
        </div>
      </div>

      <div className="login-tabs">
        <div 
          className={`login-tab ${isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          INICIAR SESIÓN
        </div>
        <div 
          className={`login-tab ${!isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          CREAR CUENTA
        </div>
      </div>

      <form className="login-form" onSubmit={handleAuth}>
        {!isLogin && (
          <div className="input-group">
            <input type="text" placeholder="Nombre completo" className="login-input" required />
          </div>
        )}
        
        <div className="input-group">
          <input type="email" placeholder="Correo electrónico" className="login-input" required />
        </div>

        <div className="input-group password-group">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Contraseña" 
            className="login-input" 
            required 
          />
          <button 
            type="button" 
            className="toggle-password" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {!isLogin && (
          <div className="input-group password-group">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Confirmar contraseña" 
              className="login-input" 
              required 
            />
          </div>
        )}

        {isLogin && (
          <div className="login-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Recordarme
            </label>
            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
          </div>
        )}

        <button type="submit" className="login-btn">
          {isLogin ? 'INGRESAR' : 'REGISTRARSE'}
        </button>
      </form>

      {isLogin && (
        <div className="social-login">
          <p>Iniciar sesión con:</p>
          <div className="social-icons">
            <button className="social-icon google">G</button>
            <button className="social-icon apple"></button>
            <button className="social-icon strava">V</button>
          </div>
        </div>
      )}

      <div className="register-link">
        {isLogin ? (
          <>¿No tienes cuenta? <span className="text-link" onClick={() => setIsLogin(false)}>Regístrate</span></>
        ) : (
          <>¿Ya tienes cuenta? <span className="text-link" onClick={() => setIsLogin(true)}>Inicia sesión</span></>
        )}
      </div>
    </div>
  );
};

export default Login;
