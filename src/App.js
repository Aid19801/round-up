import React, { Component } from 'react';
import { Homepage } from './containers';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            round-up
          </p>
        </header>

        <Homepage />
      </div>
    );
  }
}

export default App;
