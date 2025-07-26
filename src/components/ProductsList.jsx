// src/components/ProductsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar productos: ' + err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>🔄 Cargando productos...</div>;
  if (error) return <div>❌ {error}</div>;

  return (
    <div className="products-container">
      <h2>📦 Lista de Productos</h2>
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <strong>{product.name}</strong> - 💲{product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsList;
