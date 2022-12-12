import React from 'react';

export default function CardRoom({ chores, roomName, userID }) {
  //   const assignChoreToRoom = chores.map((chore) => {
  //     return chore.room;
  //   });

  const handleClick = async (e) => {
    //fetch request to update chore
    e.preventDefault();
    const response = await fetch('/chore', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        choreID: e.target.value,
        assign: false,
      }),
    });
    const data = await response.json();
    console.log('Patched Data: ', data);
  };
  console.log('chores:', chores);
  return (
    <div className="card-room">
      <div className="checkbox">
        <input type="checkbox" onClick={handleClick} value={chores.id}></input>
        {roomName} {chores.chore}
      </div>
    </div>
  );
}
