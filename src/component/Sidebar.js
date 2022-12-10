import React, { useState } from 'react';
import AddPerson from './AddPerson';
import AddChore from './AddChore';
import AddRoom from './AddRoom';
import style from './css/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>this is the sidebar</h2>
      <AddPerson />
      <AddRoom />
      <AddChore />
      <button>Add</button>
    </div>
  );
};

export default Sidebar;
