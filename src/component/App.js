import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DisplayCard from './DisplayCard';

import style from './css/app.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [chores, setChores] = useState([]);
    
  useEffect(() => {
    fetch('/choresAndUsers')
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        setUsers(data.users);
        setChores(data.chores);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  
  return (
    <div className="app">
      <header>
        <Navbar />
      </header>
      <div className="grid-container">
        <Sidebar users={users} chores={chores} setUsers={setUsers} setChores={setChores}/>
        <main className="main">
          <DisplayCard users={users} chores={chores} setUsers={setUsers} setChores={setChores}/>
        </main>
      </div>
    </div>
  );
}
