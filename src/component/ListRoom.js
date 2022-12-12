import React from 'react';

const ListRoom = ({ chores, selectedRoom, setSelectedRoom }) => {
  console.log('CHORES', chores);
  const allRooms = [];
  if (chores.length !== 0) {
    for (const chore of chores) {
      allRooms.push(chore.room);
    }
  }
  const uniqueRooms = [...new Set(allRooms)];
  return (
    <select
      className="select"
      value={selectedRoom}
      onChange={(e) => setSelectedRoom(e.target.value)}
      selected
    >
      <option value="" disabled selected>
        Room
      </option>
      {uniqueRooms.map((room) => (
        <option value={room} key={room}>
          {room}
        </option>
      ))}
    </select>
  );
};

export default ListRoom;
