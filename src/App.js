import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsersList from './components/UsersList';
import ProductsList from './components/ProductsList';
import CreateUser from './components/CreateUser';
import CreateProduct from './components/CreateProduct';
import ApiTester from './components/ApiTester.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>🚀 Laboratorio Axios</h1>
          <nav className="navigation">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/users" className="nav-link">Usuarios</Link>
            <Link to="/products" className="nav-link">Productos</Link>
            <Link to="/create-user" className="nav-link">Crear Usuario</Link>
            <Link to="/create-product" className="nav-link">Crear Producto</Link>
            <Link to="/api-tester" className="nav-link">Pruebas API</Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/api-tester" element={<ApiTester />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const Home = () => (
  <div className="home">
    <h2>Bienvenido al Laboratorio de Axios</h2>
    <p>Aquí puedes practicar diferentes operaciones con APIs:</p>
    <ul>
      <li>📋 Ver listas de usuarios y productos</li>
      <li>➕ Crear nuevos registros</li>
      <li>✏️ Editar registros existentes</li>
      <li>🗑️ Eliminar registros</li>
      <li>🧪 Probar diferentes endpoints</li>
    </ul>
    <div className="server-info">
      <h3>🖥️ Servidor Backend</h3>
      <p>JSON Server corriendo en: <code>http://localhost:3001</code></p>
      <div className="endpoints">
        <h4>Endpoints disponibles:</h4>
        <ul>
          <li>GET /users - Lista usuarios</li>
          <li>POST /users - Crear usuario</li>
          <li>PUT /users/:id - Actualizar usuario</li>
          <li>DELETE /users/:id - Eliminar usuario</li>
          <li>GET /products - Lista productos</li>
          <li>POST /products - Crear producto</li>
        </ul>
      </div>
    </div>
  </div>
);

export default App;