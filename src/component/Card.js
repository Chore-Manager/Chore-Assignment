import React from 'react';

const Card = ({ personDetail }) => {
  const { name, room, chores } = personDetail;

  return (
    <div className="card">
      <div className="card-name">
        <h2>Name: {name}</h2>
      </div>
      <div className="room">
        <h3>Room: {room}</h3>
      </div>
      <div className="chores">
        Chores:{' '}
        {chores.map((chore, index) => (
          <h4 key={index}>{chore}</h4>
        ))}
      </div>
    </div>
  );
};

export default Card;
