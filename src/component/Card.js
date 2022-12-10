import React from 'react';
import Icon from '@mdi/react';
import { mdiDeleteForeverOutline, mdiCogOutline } from '@mdi/js';
import style from './css/card.css';

const Card = ({ person }) => {
  // const { name, room, chores } = personDetail;

  //delete data from database
  const deleteData = async () => {
    const response = await fetch('/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: person.name }),
    });
    const data = await response.json();
    console.log('Delete Data:', data);
  };

  //delete data from database
  const editData = async () => {
    const response = await fetch('/chore', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: person.name }),
    });
    const data = await response.json();
    console.log('Edited Data:', data);
  };

  //click on delete button
  const onDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteData();
      console.log('Delete Data:', deleteData);
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
        <h3>Name: {person.name}</h3>
      </div>
      {/* <div className="room">
        <h3>Room: {person.room}</h3>
      </div> */}
      {/* <div className="chores">
        Chores:  */}
      {/* {person.map((chore, index) => (
          <h4 key={index}>{chore}</h4>
        ))} */}
      {/* </div> */}
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
              color="red"
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
              color="red"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
