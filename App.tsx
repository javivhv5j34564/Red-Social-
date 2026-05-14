import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Quedadas from './pages/Quedadas';
import Busqueda from './pages/Busqueda';
import Perfil from './pages/Perfil';
import Comentarios from './pages/Comentarios';
import QuedadaConfirmacion from './pages/QuedadaConfirmacion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Rutas independientes sin layout principal */}
        <Route path="/post/:id/comments" element={<Comentarios />} />
        <Route path="/quedadas/:id/confirmacion" element={<QuedadaConfirmacion />} />
        
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/quedadas" element={<Quedadas />} />
          <Route path="/busqueda" element={<Busqueda />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
