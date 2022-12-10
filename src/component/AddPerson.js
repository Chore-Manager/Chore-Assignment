import React from 'react';

const AddPerson = ({ names, selectedName, setSelectedName }) => {
  console.log('name selected');
  return (
    <select
      value={selectedName}
      onChange={(e) => setSelectedName(e.target.value)}
    >
      {names.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default AddPerson;
