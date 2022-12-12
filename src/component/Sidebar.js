import React, { useEffect, useState } from 'react';
import ListName from './ListName';
import ListRoom from './ListRoom';
import ListChore from './ListChore';
import style from './css/sidebar.css';

const Sidebar = ({ users, chores, setUsers, setChores }) => {
  // names
  //   const [names, setNames] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newName, setNewName] = useState(null);

  // rooms
  const [newRoom, setNewRoom] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState([]);

  // chores
  // const [chores, setChores] = useState([]);
  const [selectedChoreId, setSelectedChoreId] = useState([]);
  const [newChore, setNewChore] = useState(null);

  // state to show and hide add name form
  const [nameShown, setNameShown] = useState(false);

  // state to show and hide add chore form
  const [choreShown, setChoreShown] = useState(false);

  //   // constantly checking for updates to name, room, and chores state
  //   useEffect(() => {
  //     fetch('http://localhost:3000/choresAndUsers/')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const namesArr = [];
  //         const roomsArr = [];
  //         const choresArr = [];
  //         data.users.map((el) => {
  //           namesArr.push(el.name);
  //         });
  //         data.chores.map((el) => {
  //           roomsArr.push(el.room);
  //           if (selectedRoom === el.room) {
  //             choresArr.push(el.chore);
  //           }
  //         });
  //         setNames([...new Set(namesArr)]);
  //         setRooms([...new Set(roomsArr)]);
  //         setChores([...new Set(choresArr)]);
  //       });
  //   });

  // submits the form and assigns chore based on selected name, room, and chore
  const assignChore = (e) => {
    e.preventDefault();
    // console.log('ASSIGN CHORE ID:', selectedChoreId);
    console.log('ASSIGN USER ID:', selectedUserId);
    fetch('http://localhost:3000/chore', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        choreID: selectedChoreId,
        userID: selectedUserId,
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
        id: selectedUserId,
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
        console.log('something happened here');
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
        room: newRoom,
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
        choreID: selectedChoreId,
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

  // show the addname form
  const handleNameForm = (e) => {
    e.preventDefault();
    setNameShown((current) => !current);
  };

  // show the addchore form
  const handleChoreForm = (e) => {
    e.preventDefault();
    setChoreShown((current) => !current);
  };

  return (
    <div className="sidebar">
      <form className="choreForm">
        <label className="assignChoreLabel">Assign a Chore: </label>
        <div>
          <ListName
            users={users}
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
          />
          <button onClick={deleteName}>Delete current name</button>

          <button onClick={handleNameForm}>+</button>

          {nameShown && (
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
          )}
        </div>
        <div>
          <ListRoom
            chores={chores}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />
        </div>
        <div>
          <ListChore
            chores={chores}
            selectedRoom={selectedRoom}
            selectedChoreId={selectedChoreId}
            setSelectedChoreId={setSelectedChoreId}
          />
          <button onClick={deleteChore}>Delete current chore</button>

          <button onClick={handleChoreForm}>+</button>
          {choreShown && (
            <form className="add-chore">
              <input
                name="newChore"
                placeholder="add new chore"
                onChange={(e) => setNewChore(e.target.value)}
              />
              <input
                name="newRoom"
                placeholder="add new room"
                onChange={(e) => setNewRoom(e.target.value)}
              />
              <button type="submit" onClick={addChore}>
                Add Chore
              </button>
            </form>
          )}
        </div>
        <input type="submit" value="Submit" onClick={assignChore} />
      </form>
    </div>
  );
};

export default Sidebar;
