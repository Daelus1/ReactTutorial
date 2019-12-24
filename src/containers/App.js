import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 'asdf1', name: 'Max', age: 28 },
      { id: 'fqwe2', name: 'Manu', age: 29 },
      { id: 'asda3', name: 'Stephanie', age: 26 }
    ],
    inputText: "",
    inputLength: 0
  }

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  switchNameHandler = (newName) => {

    this.setState({
      persons: [
        { name: newName, age: 28},
        { name: 'Manu', age: 29},
        { name: 'Stephanie', age: 27}
      ],
      showPersons: false
    })
  }

  inputChangedHandler = (event) => {
    this.setState({
      inputText: event.target.value,
      inputLength: event.target.value.length
    });
  }

  nameChangedHandler = (event, id ) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons] //spread operator
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  render() {
    console.log("[App.js] render");
    let persons = null;

    if (this.state.showPersons) {
      persons = (
          <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler} 
            changed={this.nameChangedHandler}/>
      );
    }

    return (
      <div className={classes.App}>
        <Cockpit 
          title = {this.props.appTitle}
          showPersons={this.state.showPersons} 
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}/>

        {persons}

      </div>

    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!'));
  }
}

export default App;
