import React, { useState, useEffect } from 'react';
import Card from './Card';
import style from './css/displayCard.css';

const DisplayCard = () => {
  const [people, setPeople] = useState([]);
  // const data = [
  //   {
  //    users: [{id: 1, name: 'Tomas'}],
  //    chores: [{id: 1, chore: 'sweep', room: 'kitched', assigned_user_id: 1}]
  //   },
  // ];

  // {
  //   chores: []
  //   users: []
  // }
  useEffect(() => {
    fetch('/')
      .then((response) => response.json())
      .then((data) => {
        setPeople(data);
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  //iterating over fetched data, passing it to Card component and rendering it to the page
  // const peopleElems = people.map((person, index) => {
  //   return <Card key={index} person={person} />;
  // });

  const peopleElems = people.map((personDetail, index) => {
    return <Card key={index} person={personDetail} />;
  });

  return <div className="cards-container">Cards: {peopleElems}</div>;
};

export default DisplayCard;

// const cards = [
//   {
//     name: 'John',
//     room: 'Kitchen',
//     chores: {
//       chore1: 'Dishes',
//       chore2: 'Washing',
//       chore3: 'Cooking',
//     },
//   },
//   {
//     name: 'Tomas',
//     room: 'Bedroom',
//     chores: {
//       chore1: 'Vacuum',
//     },
//   },
//   {
//     name: 'Rachel',
//     room: 'Living Room',
//     chores: {
//       chore1: 'Sweeping',
//     },
//   },
// ];
//fetching data from server and rendering it to the page
// useEffect(() => {
//   fetch('/api')
//     .then((response) => response.json())
//     .then((data) => {
//       setCards(data);
//       console.log('Success:', data);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// });
// return (
//   <div className="cards-container">
//     {cards.map((person, index) => (
//       <div className="card" key={index}>
//         <div className="card-name">
//           <h2>{person.name}</h2>
//         </div>
//         <div className="card-body">
//           <div className="room">
//             <h3>{person.room}</h3>
//           </div>
//           <div className="chores">
//             <h4>{person.chores.chore1}</h4>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// );
