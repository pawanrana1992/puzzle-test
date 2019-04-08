import React, { Component } from 'react';
import Puzzle from "./App/Pages/Puzzle";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Puzzle puzzleSize={6}/>
      </div>
    );
  }
}

export default App;
