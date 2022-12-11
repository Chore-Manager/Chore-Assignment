import React from 'react';

const AddRoom = ({ rooms, selectedRoom, setSelectedRoom }) => {
  return (
    <select
      value={selectedRoom}
      onChange={(e) => setSelectedRoom(e.target.value)}
      selected
    >
      <option value="" disabled selected>
        Room
      </option>
      {rooms.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default AddRoom;
