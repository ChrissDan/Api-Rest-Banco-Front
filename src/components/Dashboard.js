import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Dashboard = () => {
  const { cuenta } = useParams();
  const { dni } = useParams();
  const [fromCuenta, setFromCuenta] = useState('');
  const [cliente, setCliente] = useState(null);
  const [amount, setAmount] = useState(0);
  const [transferCuenta, setTransferCuenta] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCliente();
  }, [dni]);

  const fetchCliente = async () => {
    try {
      console.log(`Fetching client data for dni: ${dni}`);
      const result = await axios.get(`http://localhost:8080/api/clientes/dni/${dni}`);
      console.log('Client data:', result.data);
      console.log('Client cuenta:', result.data.cuenta);
      setFromCuenta(result.data.cuenta);
      console.log('Client fromCuenta:', fromCuenta);
      setCliente(result.data);
    } catch (error) {
      console.error('Error fetching client data:', error);
      setMessage('Error al obtener los datos del cliente. Intente nuevamente.');
    }
  };

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const handleTransferCuentaChange = (e) => {
    setTransferCuenta(e.target.value);
  };

  const depositar = async () => {
      // Validaciones
    if (amount <= 0) {
      setMessage('Ingrese un monto válido para depositar.');
      return;
    }
    
    try {
      await axios.put(`http://localhost:8080/api/clientes/update-saldo/${dni}`, null, { params: { amount } });
      setMessage('Depósito exitoso.');
      setAmount(0); // Limpiar el input de monto
      fetchCliente();
    } catch (error) {
      setMessage('Error al depositar. Verifica los datos e intenta nuevamente.');
    }
  };

  const retirar = async () => {

      // Validaciones
    if (amount <= 0) {
      setMessage('Ingrese un monto válido para retirar.');
      return;
    }

    if (amount > cliente.saldo) {
      setMessage('Fondos insuficientes para realizar el retiro.');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/clientes/retirar-saldo/${dni}`, null, { params: { amount } });
      console(amount);
      setMessage('Retiro exitoso.');
      setAmount(0); // Limpiar el input de monto
      fetchCliente();
    } catch (error) {
      setMessage('Error al retirar. Verifica los datos e intenta nuevamente.');
    }
  };

  const transferir = async () => {
    // Validaciones
    if (amount <= 0 || !transferCuenta.trim()) {
      setMessage('Ingrese un monto válido y una cuenta de destino.');
      return;
    }
  
    if (amount > cliente.saldo) {
      setMessage('Fondos insuficientes para realizar la transferencia.');
      return;
    }
  
    try {
      await axios.put(`http://localhost:8080/api/clientes/transferir-saldo/${fromCuenta}/${transferCuenta}`, null, { params: { amount } });
      setMessage('Transferencia exitosa.');
      setAmount(0); // Limpiar el input de monto
      setTransferCuenta(''); // Limpiar el input de cuenta de transferencia
      fetchCliente();
    } catch (error) {
      setMessage('Error al transferir. Verifica los datos e intenta nuevamente.');
      setAmount(0); // Limpiar el input de monto
      setTransferCuenta(''); // Limpiar el input de cuenta de transferencia
    }
  };
  

  if (!cliente) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="py-4">
        <h2>Bienvenido, {cliente.nombre}</h2>
        <h3>Saldo: {cliente.saldo}</h3>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Monto</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            placeholder="Ingrese el monto"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary mx-2" onClick={depositar}>Depositar</button>
          <button className="btn btn-warning mx-2" onClick={retirar}>Retirar</button>
        </div>
        <div className="mb-3">
          <label htmlFor="transferCuenta" className="form-label">Cuenta del Cliente Destinatario</label>
          <input
            type="text"
            className="form-control"
            id="transferCuenta"
            placeholder="Ingrese la cuenta del cliente destinatario"
            value={transferCuenta}
            onChange={handleTransferCuentaChange}
          />
        </div>
        <button className="btn btn-danger mx-2" onClick={transferir}>Transferir</button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Dashboard;
