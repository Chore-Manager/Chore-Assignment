import React, { useEffect, useState } from 'react';
import AddPerson from './AddPerson';
import AddChore from './AddChore';
import AddRoom from './AddRoom';
import style from './css/sidebar.css';

const Sidebar = () => {
  // names
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState(names[0]);

  // rooms
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);

  // chores
  const [chores, setChores] = useState([]);
  const [selectedChore, setSelectedChore] = useState(chores[0]);

  useEffect(() => {
    fetch('http://localhost:3000/choresAndUsers/')
      .then((response) => response.json())
      .then((data) => {
        const namesArr = [];
        const roomsArr = [];
        const choresArr = [];
        data.users.map((el) => {
          namesArr.push(el.name);
        });
        data.chores.map((el) => {
          roomsArr.push(el.room);
          if (selectedRoom === el.room) {
            choresArr.push(el.chore);
          }
        });
        setNames([...new Set(namesArr)]);
        setRooms([...new Set(roomsArr)]);
        setChores([...new Set(choresArr)]);
      });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/chore', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        choreName: { selectedChore },
        userName: { selectedName },
        room: { selectedRoom },
        assign: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sidebar">
      <form>
        <label>Assign a Chore: </label>
        <AddPerson
          names={names}
          selectedName={selectedName}
          setSelectedName={setSelectedName}
        />
        <AddRoom
          rooms={rooms}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />
        <AddChore
          chores={chores}
          selectedChore={selectedChore}
          setSelectedChore={setSelectedChore}
        />
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default Sidebar;
