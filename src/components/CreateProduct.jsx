// src/components/CreateProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: ''
  });
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.price) {
        alert('❌ Nombre y precio son obligatorios');
        return;
      }

      await axios.post('http://localhost:3001/products', {
        ...formData,
        price: parseFloat(formData.price)
      });

      setFormData({ name: '', price: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert('❌ Error creando producto: ' + err.message);
    }
  };

  return (
    <div className="create-product-container">
      <h2>➕ Crear Producto</h2>
      {success && <p className="success-message">✅ Producto creado correctamente</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>📦 Nombre:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre del producto"
          />
        </div>
        <div>
          <label>💲 Precio:</label>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            type="number"
            step="0.01"
          />
        </div>
        <button type="submit">✅ Crear</button>
      </form>
    </div>
  );
};

export default CreateProduct;