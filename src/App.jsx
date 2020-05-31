import React from 'react';
import './App.css';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

import RoutePage from './RoutePage'

const history = createBrowserHistory();


function App() {
  return (
    <div className="App">
      <Router history={history}>
            <RoutePage/>
          </Router>
    </div>
  );
}

export default App;
