import React from 'react';

const ListChore = ({ chores, selectedChore, setSelectedChore }) => {
  return (
    <select
      value={selectedChore}
      onChange={(e) => setSelectedChore(e.target.value)}
      selected
    >
      <option value="" disabled selected>
        Chore
      </option>
      {chores.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default ListChore;
