import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que ambos campos estén llenos
    if (username.trim() === '' || password.trim() === '') {
      alert('Por favor completa ambos campos.');
      return;
    }

    const userData = {
      username: username,
      password: password
    };

    console.log("UserData to send:", userData);  // Verifica que los datos a enviar sean correctos

    try {
      await axios.post("http://localhost:8080/api/users/register", userData);
      navigate("/UserList");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert('Hubo un error al registrar.');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Crear Cuenta</h2>

          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>Username</label>
              <input
                type='text'
                className='form-control'
                id='username'
                placeholder='Ingresa tu username'
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>Contraseña</label>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='Ingresa tu contraseña'
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type='submit' className='btn btn-outline-primary'>Crear</button>
            <Link className='btn btn-outline-danger mx-2' to='/'>Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
