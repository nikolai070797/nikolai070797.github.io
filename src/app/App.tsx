import React from 'react';
import logo from './logo.svg';
import './App.css';
import './test';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>Николай Тартышный</h1>
          <p>
            <strong>Цель:</strong> Систематизировать знания по React и его окружения
          </p>
          <p>
            <strong>Технологии:</strong> Full Stack .NET C#, React, MSSQL
          </p>
          <p>
            <strong>Опыт:</strong> 6 лет в разработке
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
