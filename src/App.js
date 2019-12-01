import React, { Component } from 'react';
import Exam from './Component/exam';
import Canvas from './Component/canvas';
import Context from './Component/Context';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Context />
      </div>
    );
  }
}

export default App;
