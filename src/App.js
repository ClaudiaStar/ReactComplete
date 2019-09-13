import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';


  // This is the default way of managing state in React (with a class component). Later on we will learn about using hooks to handle state in functional components
class App extends Component {
  state = {
    persons: [
      { name: 'Claudia', age: 30 },
      { name: 'Chris', age: 32 },
      { name: 'Gael', age: 3 }
    ],
    otherState: 'some other value',
    // Boolean that will be used in togglerPersonsHandler
    showPersons: false
  };

  // Function that handles the onClick event for the button below
  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DONT DO THIS: this.state.persons[0].name = 'Claudia Giovanna'
    this.setState({persons: [
      { name: newName, age: 3 },
      { name: 'Chris', age: 30 },
      { name: 'Gael', age: 32 }
    ] })
  }

  nameChangedHandler = (event) => {
    this.setState({persons: [
      { name: 'Claudia', age: 3 },
      // event.target.value access the value typed in the input element
      { name: event.target.value, age: 30 },
      { name: 'Gael', age: 32 }
    ] })
  }

  // Toggler Persons Button Handler which will show and hide Person components each time it is clicked
  togglerPersonsHandler = (event) => {
      const doesShow = this.state.showPersons;
      this.setState({showPersons: !doesShow});
  }



  render() {

    // Can also use in-line styles. Changing props on hover is hard to do with in-line though.
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;

    // Conditional statement which tells the button to either hide or show the Person components
    if (this.state.showPersons) {
      persons = (
        <div>
      <Person
        name={this.state.persons[0].name}
        age={this.state.persons[0].age} />
      <Person
        name={this.state.persons[1].name}
        age={this.state.persons[1].age}
      // changed is arbitrary name given to the new prop which will be tied to the input element in Person component
        changed={this.nameChangedHandler}
      />
      <Person
        name={this.state.persons[2].name}
        age={this.state.persons[2].age}
      // You can pass methods as props as shown below
      // You can also pass arguments with bind(this, data)
        click={this.switchNameHandler.bind(this, 'Cloud!')}>Otherwise known as silly canoot.</Person>
      </div>
      );
    }

    return (
      <div className = "App">
      <h1> Hi, I'm a React App</h1>
      <p>This is really working!</p>

      <button
      style={style}
      onClick={this.togglerPersonsHandler}>Toggler Persons</button>
      {persons}
      </div>
    );
  }
}

export default App;
