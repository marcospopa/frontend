// src/components/ApiTester.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ApiTester = () => {
  const [endpoint, setEndpoint] = useState('/users');
  const [method, setMethod] = useState('GET');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const testApi = async () => {
    try {
      setError(null);
      setResponse(null);
      const url = `http://localhost:3001${endpoint}`;

      const res = await axios({ method, url });
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="api-tester">
      <h2>🧪 Probador de API</h2>
      <div>
        <label>Endpoint:</label>
        <input
          value={endpoint}
          onChange={e => setEndpoint(e.target.value)}
          placeholder="/users"
        />
      </div>
      <div>
        <label>Método:</label>
        <select value={method} onChange={e => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
      </div>
      <button onClick={testApi}>▶️ Ejecutar</button>

      {response && (
        <div className="response">
          <h3>📦 Respuesta:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div className="error">
          <h3>❌ Error:</h3>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiTester;