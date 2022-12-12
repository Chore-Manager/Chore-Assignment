import React, { useState, useEffect } from 'react';
import Card from './Card';
import style from './css/displayCard.css';

const DisplayCard = ({ users, chores, setUsers, setChores }) => {
  //iterating over fetched data, passing it to Card component and rendering it to the page
  const userElems = users.map((user, index) => {
    return (
      <Card
        key={index}
        user={user}
        userName={user.name}
        userID={user.id}
        chores={chores.filter((chore) => chore.assigned_user_id === user.id)}
        setChores={setChores}
        setUsers={setUsers}
      />
    );
  });
  console.log('userlemes', userElems);

  return <div className="cards-container"> {userElems}</div>;
};

export default DisplayCard;
