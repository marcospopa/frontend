import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError('Error cargando usuarios: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await userService.delete(userId);
        setUsers(users.filter(user => user.id !== userId));
        alert('✅ Usuario eliminado exitosamente');
      } catch (err) {
        alert('❌ Error eliminando usuario: ' + err.message);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      department: user.department
    });
  };

  const handleSaveEdit = async () => {
    try {
      const updatedUser = await userService.update(editingUser, editForm);
      setUsers(users.map(user => 
        user.id === editingUser ? updatedUser : user
      ));
      setEditingUser(null);
      setEditForm({});
      alert('✅ Usuario actualizado exitosamente');
    } catch (err) {
      alert('❌ Error actualizando usuario: ' + err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({});
  };

  if (loading) return <div className="loading">🔄 Cargando usuarios...</div>;
  if (error) return <div className="error">❌ {error}</div>;

  return (
    <div className="users-container">
      <div className="section-header">
        <h2>👥 Lista de Usuarios</h2>
        <button onClick={loadUsers} className="refresh-btn">
          🔄 Actualizar
        </button>
      </div>

      {users.length === 0 ? (
        <div className="no-data">No hay usuarios registrados</div>
      ) : (
        <div className="users-grid">
          {users.map(user => (
            <div key={user.id} className="user-card">
              {editingUser === user.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    placeholder="Nombre"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    placeholder="Teléfono"
                  />
                  <input
                    type="text"
                    value={editForm.department}
                    onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                    placeholder="Departamento"
                  />
                  <div className="edit-buttons">
                    <button onClick={handleSaveEdit} className="save-btn">
                      ✅ Guardar
                    </button>
                    <button onClick={handleCancelEdit} className="cancel-btn">
                      ❌ Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>📧 {user.email}</p>
                  <p>📱 {user.phone}</p>
                  <p>🏢 {user.department}</p>
                  <div className="user-actions">
                    <button 
                      onClick={() => handleEdit(user)} 
                      className="edit-btn"
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)} 
                      className="delete-btn"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;