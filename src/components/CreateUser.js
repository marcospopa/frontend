import React, { useState } from 'react';
import { userService } from '../services/userService';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setSuccess(false);
      
      // Validación básica
      if (!formData.name || !formData.email) {
        alert('❌ Nombre y email son obligatorios');
        return;
      }

      // Llamada a la API
      const newUser = await userService.create(formData);
      
      console.log('✅ Usuario creado:', newUser);
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: ''
      });
      
      setSuccess(true);
      
      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (error) {
      console.error('❌ Error:', error);
      alert('❌ Error creando usuario: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: ''
    });
    setSuccess(false);
  };

  return (
    <div className="create-user-container">
      <div className="section-header">
        <h2>➕ Crear Nuevo Usuario</h2>
      </div>

      {success && (
        <div className="success-message">
          ✅ Usuario creado exitosamente!
        </div>
      )}

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label htmlFor="name">👤 Nombre *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingresa el nombre completo"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">📧 Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">📱 Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1234567890"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">🏢 Departamento</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Selecciona un departamento</option>
            <option value="Desarrollo">Desarrollo</option>
            <option value="Diseño">Diseño</option>
            <option value="Marketing">Marketing</option>
            <option value="Ventas">Ventas</option>
            <option value="Recursos Humanos">Recursos Humanos</option>
            <option value="Contabilidad">Contabilidad</option>
          </select>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={loading || !formData.name || !formData.email}
            className="submit-btn"
          >
            {loading ? '⏳ Creando...' : '✅ Crear Usuario'}
          </button>
          
          <button 
            type="button" 
            onClick={handleReset}
            disabled={loading}
            className="reset-btn"
          >
            🔄 Limpiar
          </button>
        </div>
      </form>

      <div className="form-info">
        <h3>💡 Información:</h3>
        <ul>
          <li>Los campos marcados con (*) son obligatorios</li>
          <li>El email debe tener un formato válido</li>
          <li>Los datos se guardarán en el servidor local</li>
          <li>Puedes ver el usuario creado en la sección "Usuarios"</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateUser;