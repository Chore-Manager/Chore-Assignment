import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DisplayCard from './DisplayCard';

import style from './css/app.css';

export default function App() {
  return (
    <div className="app">
      <header>
        <Navbar />
      </header>
      <div className="grid-container">
        <Sidebar />
        <main className="main">
          <DisplayCard />
        </main>
      </div>
    </div>
  );
}
