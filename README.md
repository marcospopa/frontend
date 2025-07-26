# 🚀 Laboratorio Axios - Documentación Completa

Este laboratorio te permite practicar operaciones CRUD (Create, Read, Update, Delete) con axios en un entorno local completo.

## 📋 Índice

- [Configuración Inicial](#configuración-inicial)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Ejecutar el Laboratorio](#ejecutar-el-laboratorio)
- [API Endpoints](#api-endpoints)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Funcionalidades del Frontend](#funcionalidades-del-frontend)
- [Ejercicios Prácticos](#ejercicios-prácticos)
- [Solución de Problemas](#solución-de-problemas)

## 🛠️ Configuración Inicial

### Prerrequisitos
- Node.js 14+ instalado
- VS Code o tu editor favorito
- Terminal/línea de comandos

### Instalación

1. **Clonar/crear la estructura del proyecto:**
```bash
mkdir axios-lab
cd axios-lab
```

2. **Configurar el backend:**
```bash
mkdir backend
cd backend
npm init -y
npm install -g json-server
# Crear db.json con los datos proporcionados
cd ..
```

3. **Configurar el frontend:**
```bash
npx create-react-app frontend
cd frontend
npm install axios react-router-dom
# Crear los archivos de configuración proporcionados
```

## 📁 Estructura del Proyecto

```
axios-lab/
├── backend/
│   ├── db.json              # Base de datos simulada
│   └── package.json         # Configuración del servidor
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   │   └── config.js     # Configuración de axios
    │   ├── services/
    │   │   ├── userService.js    # Servicios para usuarios
    │   │   └── productService.js # Servicios para productos
    │   ├── components/
    │   │   ├── UsersList.js      # Lista de usuarios
    │   │   ├── CreateUser.js     # Crear usuario
    │   │   ├── ProductsList.js   # Lista de productos
    │   │   └── CreateProduct.js  # Crear producto
    │   ├── App.js           # Componente principal
    │   ├── App.css          # Estilos
    │   └── index.js         # Punto de entrada
    └── package.json
```

## 🚀 Ejecutar el Laboratorio

### 1. Iniciar el Backend (Terminal 1)
```bash
cd axios-lab/backend
npm start
```
El servidor JSON estará disponible en: `http://localhost:3001`

### 2. Iniciar el Frontend (Terminal 2)
```bash
cd axios-lab/frontend
npm start
```
La aplicación React estará disponible en: `http://localhost:3000`

### 3. Verificar que todo funciona
- Ve a `http://localhost:3000` en tu navegador
- Deberías ver la página de inicio del laboratorio
- Navega a "Usuarios" para ver la lista

## 🌐 API Endpoints

El servidor JSON proporciona los siguientes endpoints:

### Usuarios (`/users`)

| Método | Endpoint | Descripción | Ejemplo de Body |
|--------|----------|-------------|-----------------|
| `GET` | `/users` | Obtener todos los usuarios | - |
| `GET` | `/users/:id` | Obtener usuario por ID | - |
| `POST` | `/users` | Crear nuevo usuario | `{"name": "Juan", "email": "juan@test.com", "phone": "+123", "department": "IT"}` |
| `PUT` | `/users/:id` | Actualizar usuario completo | `{"name": "Juan Updated", "email": "juan@test.com", "phone": "+123", "department": "IT"}` |
| `PATCH` | `/users/:id` | Actualizar campos específicos | `{"name": "Juan Parcial"}` |
| `DELETE` | `/users/:id` | Eliminar usuario | - |

### Productos (`/products`)

| Método | Endpoint | Descripción | Ejemplo de Body |
|--------|----------|-------------|-----------------|
| `GET` | `/products` | Obtener todos los productos | - |
| `GET` | `/products/:id` | Obtener producto por ID | - |
| `POST` | `/products` | Crear nuevo producto | `{"name": "iPhone 16", "price": 999.99, "category": "Electronics", "stock": 10}` |
| `PUT` | `/products/:id` | Actualizar producto completo | `{"name": "iPhone 16 Pro", "price": 1199.99, "category": "Electronics", "stock": 5}` |
| `PATCH` | `/products/:id` | Actualizar campos específicos | `{"price": 899.99}` |
| `DELETE` | `/products/:id` | Eliminar producto | - |

### Posts (`/posts`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/posts` | Obtener todos los posts |
| `GET` | `/posts/:id` | Obtener post por ID |
| `POST` | `/posts` | Crear nuevo post |
| `PUT` | `/posts/:id` | Actualizar post |
| `DELETE` | `/posts/:id` | Eliminar post |

## 💡 Ejemplos de Uso

### 1. Realizar peticiones desde la consola del navegador

Abre las DevTools (F12) y prueba estos comandos en la consola:

```javascript
// GET - Obtener todos los usuarios
fetch('http://localhost:3001/users')
  .then(r => r.json())
  .then(console.log);

// POST - Crear nuevo usuario
fetch('http://localhost:3001/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    department: 'Testing'
  })
}).then(r => r.json()).then(console.log);

// PUT - Actualizar usuario (ID 1)
fetch('http://localhost:3001/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Usuario Actualizado',
    email: 'updated@example.com',
    phone: '+9876543210',
    department: 'Updated Dept'
  })
}).then(r => r.json()).then(console.log);

// DELETE - Eliminar usuario (ID 1)
fetch('http://localhost:3001/users/1', {
  method: 'DELETE'
}).then(r => console.log('Deleted:', r.status));
```

### 2. Usar axios directamente en el código

```javascript
import axios from 'axios';

// Configurar axios
const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000
});

// Ejemplos de uso
const ejemplos = {
  // GET
  obtenerUsuarios: async () => {
    const response = await api.get('/users');
    console.log('Usuarios:', response.data);
  },

  // POST
  crearUsuario: async () => {
    const nuevoUsuario = {
      name: 'María Test',
      email: 'maria@test.com',
      phone: '+1111111111',
      department: 'QA'
    };
    const response = await api.post('/users', nuevoUsuario);
    console.log('Usuario creado:', response.data);
  },

  // PUT
  actualizarUsuario: async (id) => {
    const datosActualizados = {
      name: 'María Actualizada',
      email: 'maria.updated@test.com',
      phone: '+2222222222',
      department: 'QA Senior'
    };
    const response = await api.put(`/users/${id}`, datosActualizados);
    console.log('Usuario actualizado:', response.data);
  },

  // DELETE
  eliminarUsuario: async (id) => {
    await api.delete(`/users/${id}`);
    console.log('Usuario eliminado');
  }
};
```

### 3. Filtros y consultas

JSON Server soporta filtros en las consultas:

```javascript
// Filtrar por campo
api.get('/users?department=Desarrollo')

// Buscar por texto
api.get('/users?q=Juan')

// Paginación
api.get('/users?_page=1&_limit=5')

// Ordenar
api.get('/users?_sort=name&_order=asc')

// Campos específicos
api.get('/users?_embed=posts&_expand=category')
```

## 🖥️ Funcionalidades del Frontend

### Navegación Principal

1. **Inicio (`/`)**: Información general y documentación rápida
2. **Usuarios (`/users`)**: Lista completa con opciones de editar/eliminar
3. **Productos (`/products`)**: Lista de productos con gestión CRUD
4. **Crear Usuario (`/create-user`)**: Formulario para agregar usuarios
5. **Crear Producto (`/create-product`)**: Formulario para agregar productos
6. **Pruebas API (`/api-tester`)**: Herramienta para probar endpoints

### Características por Sección

#### Lista de Usuarios
- ✅ Ver todos los usuarios
- ✏️ Editar inline (click en "Editar")
- 🗑️ Eliminar con confirmación
- 🔄 Actualizar lista
- 📱 Diseño responsive

#### Crear Usuario
- 📝 Formulario validado
- ✅ Campos obligatorios marcados
- 🔄 Limpiar formulario
- ✅ Confirmación de éxito
- ❌ Manejo de errores

#### Funciones Automáticas
- 🔍 Logs en consola para debug
- ⏱️ Timeout de 10 segundos
- 🚦 Interceptores para peticiones/respuestas
- 📊 Estados de carga
- ❌ Manejo de errores centralizado

## 🎯 Ejercicios Prácticos

### Nivel Principiante

1. **Explorar la API**
   - Ve a `http://localhost:3001` en tu navegador
   - Explora los endpoints disponibles
   - Mira la estructura de datos

2. **Usar la interfaz**
   - Crea 3 usuarios nuevos
   - Edita un usuario existente
   - Elimina un usuario
   - Navega entre las secciones

### Nivel Intermedio

3. **Modificar el código**
   - Agrega un nuevo campo "edad" a los usuarios
   - Crea validaciones personalizadas
   - Modifica los estilos CSS

4. **Crear nuevos servicios**
   - Implementa el servicio para `posts`
   - Crea componentes para gestionar posts
   - Agrega una nueva ruta en el menú

### Nivel Avanzado

5. **Funcionalidades extra**
   - Implementa búsqueda en tiempo real
   - Agrega paginación
   - Crea un sistema de filtros
   - Implementa cache local

6. **Optimizaciones**
   - Agrega loading skeletons
   - Implementa debounce en búsquedas
   - Agrega confirmaciones modales
   - Implementa undo/redo

## 🔧 Personalización

### Agregar nuevos endpoints

1. **Modificar `db.json`:**
```json
{
  "categories": [
    {
      "id": 1,
      "name": "Electrónicos",
      "description": "Dispositivos electrónicos"
    }
  ]
}
```

2. **Crear servicio:**
```javascript
// services/categoryService.js
import api from '../api/config';

export const categoryService = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  // ... más métodos
};
```

3. **Crear componente:**
```javascript
// components/CategoriesList.js
import { categoryService } from '../services/categoryService';
// ... implementar componente
```

### Configurar diferentes entornos

```javascript
// api/config.js
const apiURL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3001'
  : 'https://tu-api-produccion.com';

const api = axios.create({
  baseURL: apiURL,
  // ... otras configuraciones
});
```

## 🐛 Solución de Problemas

### Problemas Comunes

**1. Error: "Network Error" o CORS**
```bash
# Solución: Verificar que el servidor JSON esté corriendo
cd backend
npm start
```

**2. Puerto ocupado**
```bash
# Cambiar puerto del servidor JSON
json-server --watch db.json --port 3002

# Actualizar baseURL en frontend/src/api/config.js
baseURL: 'http://localhost:3002'
```

**3. Datos no se actualizan**
- Verificar que el método HTTP sea correcto
- Revisar la consola del navegador para errores
- Comprobar que el `db.json` tenga permisos de escritura

**4. Frontend no carga**
```bash
# Reinstalar dependencias
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Debugging Tips

1. **Usar las DevTools:**
   - Network tab: ver todas las peticiones HTTP
   - Console tab: ver logs y errores
   - Application tab: ver almacenamiento local

2. **Logs útiles:**
```javascript
// En cualquier servicio
console.log('Enviando datos:', data);
console.log('Respuesta recibida:', response);
console.error('Error:', error);
```

3. **Verificar el servidor:**
```bash
# Ver logs del JSON Server
cd backend
npm start
# Cada petición aparecerá en la terminal
```

## 📚 Recursos Adicionales

- [Documentación oficial de Axios](https://axios-http.com/)
- [JSON Server Documentation](https://github.com/typicode/json-server)
- [React Router Documentation](https://reactrouter.com/)
- [MDN Web Docs - HTTP Methods](https://developer.mozilla.org/es/docs/Web/HTTP/Methods)

## 🎉 ¡Diviértete Practicando!

Este laboratorio está diseñado para que experimentes y aprendas. No tengas miedo de:
- Romper cosas (puedes reiniciar fácilmente)
- Modificar el código
- Agregar nuevas funcionalidades
- Probar diferentes escenarios de error
- Experimentar con los datos

¡La práctica hace al maestro! 🚀
