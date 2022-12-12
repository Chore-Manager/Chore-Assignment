import React from 'react';

const ListChore = ({
  chores,
  selectedChoreId,
  setSelectedChoreId,
  selectedRoom,
}) => {
  const choresArr = [];

  chores.map((value) => {
    if (value.room === selectedRoom) {
      choresArr.push(
        <option value={value.id} key={value.chore}>
          {value.chore}
        </option>
      );
    }
  });

  return (
    <select
      className="select"
      value={selectedChoreId}
      onChange={(e) => setSelectedChoreId(e.target.value)}
      selected
    >
      <option value="" disabled selected>
        Chore
      </option>
      {choresArr}
    </select>
  );
};

export default ListChore;
