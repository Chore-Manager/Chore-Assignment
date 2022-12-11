import React from 'react';

const AddPerson = ({ names, selectedName, setSelectedName }) => {
  return (
    <select
      value={selectedName}
      onChange={(e) => setSelectedName(e.target.value)}
      selected
    >
      <option defaultValue="Name" disabled selected>
        Name
      </option>
      {names.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default AddPerson;
