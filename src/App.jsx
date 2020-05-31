import React from 'react';
import './App.scss';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';



import RoutePage from './RoutePage'
import NavBar from './cmps/NavBar';


const history = createBrowserHistory();



function App() {
  return (
    <div className="App">
      <Router history={history}>
         <NavBar/>
            <RoutePage/>
          </Router>
    </div>
  );
}

export default App;
