import React, { useState, useEffect } from 'react';
import style from './css/displayCard.css';

const DisplayCard = () => {
  const [cards, setCards] = useState([]);

  //fetching data from server and rendering it to the page
  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => {
        setCards(data);
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

  return (
    <div className="cards-container">
      <h2>Cards Container</h2>
      {cards.map((person, index) => (
        <div className="card" key={index}>
          <div className="card-name">
            <h2>{person.name}</h2>
            <div className="card-body">
              <div className="room">
                <h3>{person.room}</h3>
                <div className="chores">
                  <h4>{person.chores}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayCard;
