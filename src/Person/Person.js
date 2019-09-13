// create functional component (ES6)
// Should be used most of the time
// ES6 functions hold advantage especially with the "this" keyword

import React from 'react';
import './Person.css';

const person = (props) => {
  return (
    <div className="Person">
    <p onClick={props.click}>My name is {props.name} and I am {props.age} years old.</p>
    <p>{props.children}</p>
    {/*Two way binding to the input element since we have an original value and a an onChange value*/}
    <input type="text" onChange={props.changed} value={props.name}/>
    </div>
  );
};

export default person;
