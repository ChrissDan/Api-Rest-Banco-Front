import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1>Banco A</h1>
      <div className="mt-4">
        <Link className="btn btn-primary mx-2" to="/internetBanking">Banca por Internet</Link>
        <Link className="btn btn-primary mx-2" to="/login">Admin</Link>
      </div>
    </div>
  );
};

export default Home;
