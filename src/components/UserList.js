// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import app from '../App';
import axios from 'axios';

export default function UserList(){
    const [users, setUsers] = useState([]);

    useEffect(()=>{
      loadUsers();
    },[]);

    const loadUsers=async()=>{
      const result=await axios.get("http://localhost:8080/api/users");
      setUsers(result.data);
    }


  return (
    <div className="container mt-4">
      <div className='py-4'>
      <h2>Usuarios</h2>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>UserName</th>
              <th scope='col'>Password</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((users, index)=>(
                <tr>
                  <th scope='row' key={index}>{users.id}</th>
                  <td>{users.username}</td>
                  <td>{users.password}</td>
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
