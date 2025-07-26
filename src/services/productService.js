import api from '../api/config';

export const productService = {
  // Obtener todos los productos
  getAll: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      throw error;
    }
  },

  // Obtener producto por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo producto:', error);
      throw error;
    }
  },

  // Crear nuevo producto
  create: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creando producto:', error);
      throw error;
    }
  },

  // Actualizar producto
  update: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error actualizando producto:', error);
      throw error;
    }
  },

  // Eliminar producto
  delete: async (id) => {
    try {
      await api.delete(`/products/${id}`);
      return true;
    } catch (error) {
      console.error('Error eliminando producto:', error);
      throw error;
    }
  }
};