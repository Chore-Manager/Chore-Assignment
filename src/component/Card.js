import React, { useEffect, useState } from 'react';
import CardRoom from './CardRoom';
import Icon from '@mdi/react'; //module for icons
import { mdiDeleteForeverOutline, mdiCogOutline } from '@mdi/js'; //module for icons
import style from './css/card.css';

const Card = ({ userName, userID, chores, setUsers }) => {
  //delete user from database
  const deleteUser = async () => {
    const response = await fetch('/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userID }),
    });
    const data = await response.json();
    setUsers((prev) => prev.filter((user) => user.name !== userName)); //filtering out the deleted user from the state

    console.log('Delete Data:', data);
  };

  //edit data from database
  const editData = async () => {
    const response = await fetch('/chore', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: userName }),
    });
    const data = await response.json();
    console.log('Edited Data:', data);
  };

  //click on delete button
  const onDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteUser();
      console.log('Delete Data:', deleteUser);
    } catch (err) {
      console.error(err.message);
    }
  };

  //click on edit button
  const onEdit = async (e) => {
    e.preventDefault();
    try {
      await editData();
      console.log('Edited Data:', editData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const userRooms = chores.map((chore, index) => {
    console.log('chores', chores);
    if (chore.assigned_user_id === userID) {
      return (
        <CardRoom
          key={index}
          userID={userID}
          roomName={chore.room}
          chores={chore}
        />
      );
    }
  });

  return (
    <div className="card">
      <div className="card-name">
        <h3>{userName}</h3>
      </div>
      {userRooms}

      <div className="footer">
        <div className="actionsContainer">
          <button
            className="deleteBtn"
            type="submit"
            onClick={(e) => onDelete(e)}
          >
            <Icon
              path={mdiDeleteForeverOutline}
              // title="User Profile"
              size={1}
              horizontal
              vertical
              rotate={180}
              color="white"
            />
          </button>
          <button className="editBtn" type="submit" onClick={(e) => onEdit(e)}>
            <Icon
              path={mdiCogOutline}
              // title="User Profile"
              size={1}
              horizontal
              vertical
              rotate={180}
              color="white"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
