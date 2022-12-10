import React, { useState } from 'react';

const options = ['Rachel', 'John', 'Tomas', 'Dennis'];

function AddPerson() {
  const [selected, setSelected] = useState('');
  const [names, setNames] = useState([]);
  const submit = () => {
    console.log(selected);
  };
  return (
    <form>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        {options.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
      <button type="button" onClick={submit}>
        Submit
      </button>
    </form>
  );
}

export default AddPerson;
