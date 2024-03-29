import React from 'react';

const ListName = ({ users, selectedUserId, setSelectedUserId }) => {
  return (
    <select
      className="select"
      value={selectedUserId}
      onChange={(e) => setSelectedUserId(e.target.value)}
      data-testId='list'
      selected
    >
      <option defaultValue="Name" disabled selected>
        Name
      </option>
      {users.map((value) => (
        <option value={value.id} key={value.name}>
          {value.name}
        </option>
      ))}
    </select>
  );
};

export default ListName;
