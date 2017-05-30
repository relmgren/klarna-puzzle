import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CellularAutomata from './CA/CellularAutomata';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>A Cellular Automaton</h2>
        </div>
        <div className="Instructions-text">
        <p>
          The rules from Klarna:</p>
          <p>
          Survival: An “alive” cell lives on to the next generation, when it has two or three “alive” neighbour cells.</p>
          <p>Death: An “alive” cell will die, when it either has fewer than two “alive” neighbour cells, or when it has more than three “alive” neighbour cells.</p>
          <p>Birth: A “dead” cell with exactly three “alive” neighbour cells is brought to life.</p>
          <p>I added a rule that the next iteration gets put onto the next row. If the row is > the canvas it starts over on the first row.</p>
        </div>


        <CellularAutomata />
      </div>
    );
  }
}

export default App;
