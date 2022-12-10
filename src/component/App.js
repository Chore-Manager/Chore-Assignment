import React from 'react';
import AddPerson from './AddPerson';
import AddChore from './AddChore';
import AddRoom from './AddRoom';
import Navbar from './Navbar';
import DisplayCard from './DisplayCard';

import style from './css/app.css';

export default function App() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="grid-container">
        <nav className="sidebar">
          <h2>this is the sidebar</h2>
          <AddPerson />
          <AddRoom />
          <AddChore />
          <button>Add</button>
        </nav>
        <main className="main">
          <DisplayCard />
        </main>
      </div>
    </div>
  );
}
