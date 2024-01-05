// App.tsx
import React from 'react';
import './App.css';
import StartGame from './components/StartGame';
import ScoreBoard from './components/ScoreBoard';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dart Game</h1>
      </header>
      <StartGame />
      <ScoreBoard />
    </div>
  );
};

export default App;
