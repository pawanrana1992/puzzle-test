import React, { Component } from 'react';
import Puzzle from "./App/Pages/Puzzle";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Puzzle puzzleSize={5}/>
      </div>
    );
  }
}

export default App;
