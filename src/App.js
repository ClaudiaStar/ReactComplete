import React, { Component } from 'react';
import './App.css';
// Radium allows usage of pseudo selectors & media queries
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';



  // This is the default way of managing state in React (with a class component). Later on we will learn about using hooks to handle state in functional components
class App extends Component {
  state = {
    persons: [
      { id: 'akhakhf', name: 'Claudia', age: 30 },
      { id: 'akghahg', name: 'Chris', age: 32 },
      { id: 'jfajgal', name: 'Gael', age: 3 }
    ],
    otherState: 'some other value',
    // Boolean that will be used in togglerPersonsHandler
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
    ...this.state.persons[personIndex]
  };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;


    this.setState({persons: persons})
  }

  deletePersonHandler = (personIndex) => {
    // The slice() method below returns the selected elements in an array, as a new array object.
    // const persons = this.state.persons.slice();
    // The spread operator method is another way to make a copy of an old array & more modern.
    const persons = [...this.state.persons];
    // The splice method below removes array element at personIndex (1 means remove);
    persons.splice(personIndex, 1);
    // A new person array is returned and set as new state
    this.setState({persons: persons});
  }




  // Toggler Persons Button Handler which will show and hide Person components each time it is clicked
  togglerPersonsHandler = (event) => {
      const doesShow = this.state.showPersons;
      this.setState({showPersons: !doesShow});
  }



  render() {

    // Can also use in-line styles. Changing props on hover is hard to do with in-line though.
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      // pseudo selectors are available now since Radium was imported
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;


    if (this.state.showPersons) {
      persons = (
// Person components rendered as list by mapping an array instead of one by one as done previously
        <div>
          {this.state.persons.map((person, index)=> {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}
            />
          })}
      </div>
      );
      //set button background color to red when persons is active
      style.backgroundColor ='red';
      // syntax to use pseudo selector thanks to Radium
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }

    }

    const classes = [];
    if ( this.state.persons.length <=2 ) {
      classes.push('red');
      // classes = [red]
    }
    if ( this.state.persons.length <= 1 ) {
      classes.push('bold');
      // classes = [bold]
    }


    return (
      // Must wrap app in StyleRoot tags whenever using Radium for media queries or keyframes
      <StyleRoot>
      <div className = "App">
      <h1> Hi, I'm a React App</h1>
      <p className={classes.join(' ')}>This is really working!</p>

      <button
      style={style}
      onClick={this.togglerPersonsHandler}>Toggler Persons</button>
      {persons}
      </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
