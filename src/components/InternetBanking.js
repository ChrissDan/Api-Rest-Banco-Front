import React from 'react';
import { Link } from 'react-router-dom';

const InternetBanking = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Banca por Internet</h1>
      <div className="mt-4">
        <Link className="btn btn-primary mx-2" to="/registerClient">Crear Cuenta</Link>
        <Link className="btn btn-secondary mx-2" to="/miBancaLogin">Banca</Link>
      </div>
    </div>
  );
};

export default InternetBanking;
