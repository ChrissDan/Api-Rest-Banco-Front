// src/components/ClientList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ClientList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const result = await axios.get("http://localhost:8080/api/clientes");
    setClients(result.data);
  }

  return (
    <div className="container mt-4">
      <div className='py-4'>
        <h2>Clientes</h2>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Nombre</th>
              <th scope='col'>Apellido</th>
              <th scope='col'>DNI</th>
              <th scope='col'>Cuenta</th>
              <th scope='col'>Saldo</th>
              <th scope='col'>Contraseña</th>
            </tr>
          </thead>
          <tbody>
            {
              clients.map((client, index) => (
                <tr key={index}>
                  <th scope='row'>{client.id}</th>
                  <td>{client.nombre}</td>
                  <td>{client.apellido}</td>
                  <td>{client.dni}</td>
                  <td>{client.cuenta}</td>
                  <td>{client.saldo}</td>
                  <td>{client.contrasena}</td>
                  <td>
                    <button className='btn btn-primary mx-2'>View</button>
                    <button className='btn btn-outline-primary mx-2'>Edit</button>
                    <button className='btn btn-danger mx-2'>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
