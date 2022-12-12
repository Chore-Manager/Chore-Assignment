import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react'; //module for icons
import { mdiDeleteForeverOutline, mdiCogOutline } from '@mdi/js'; //module for icons
import style from './css/card.css';

const Card = ({ userName, userID, users, chores, setChores, setUsers }) => {
  const assignRoomToUser = chores.map((chore) => {
    if (chore.assigned_user_id === userID) {
      return chore.room;
    }
  });
  const assignChoreToRoom = chores.map((chore) => {
    if (chore.assigned_user_id === userID) {
      return chore.chore;
    }
  });

  // console.log('selectedRoom', selectedRoom);

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

  return (
    <div className="card">
      <div className="card-name">
        <h3>{userName}</h3>
      </div>
      <div className="room">
        <h4>Room: {assignRoomToUser}</h4>
      </div>
      <div className="chores">Chores: {assignChoreToRoom}</div>
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
