import React, { useEffect, useState } from 'react';
import ListName from './ListName';
import ListRoom from './ListRoom';
import ListChore from './ListChore';
import style from './css/sidebar.css';

const Sidebar = () => {
  // names
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState(names[0]);
  const [newName, setNewName] = useState('');

  // rooms
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [newRoom, setNewRoom] = useState('');

  // chores
  const [chores, setChores] = useState([]);
  const [selectedChore, setSelectedChore] = useState(chores[0]);
  const [newChore, setNewChore] = useState('');

  // constantly checking for updates to name, room, and chores state
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

  // submits the form and assigns chore based on selected name, room, and chore
  const assignChore = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/chore', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        choreName: selectedChore,
        userName: selectedName,
        room: selectedRoom,
        assign: true,
      }),
    });
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // deletes selected name from dropdown menu
  const deleteName = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: selectedName,
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

  // adds new name to the dropdown menu
  const addName = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: newName,
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

  // adds new chore to the dropdown menu
  const addChore = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/chore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        chore: newChore,
        room: selectedRoom,
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

  // deletes selected chore from dropdown menu
  const deleteChore = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/chore', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        chore: selectedChore,
        room: selectedRoom,
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
      <form className="choreForm">
        <label>Assign a Chore: </label>
        <div>
          <ListName
            names={names}
            selectedName={selectedName}
            setSelectedName={setSelectedName}
          />
          <button onClick={deleteName}>Delete current name</button>
          <form className="add-name">
            <input
              name="newName"
              placeholder="new name"
              onChange={(e) => setNewName(e.target.value)}
            />
            <button type="submit" onClick={addName}>
              Add Name
            </button>
          </form>
        </div>
        <div>
          <ListRoom
            rooms={rooms}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />
        </div>
        <div>
          <ListChore
            chores={chores}
            selectedChore={selectedChore}
            setSelectedChore={setSelectedChore}
          />
          <button onClick={deleteChore}>Delete current chore</button>
          <form className="add-chore">
            <input
              name="newChore"
              placeholder="add new chore"
              onChange={(e) => setNewChore(e.target.value)}
            />
            <button type="submit" onClick={addChore}>
              Add Chore
            </button>
          </form>
        </div>
        <input type="submit" value="Submit" onClick={assignChore} />
      </form>
    </div>
  );
};

export default Sidebar;
