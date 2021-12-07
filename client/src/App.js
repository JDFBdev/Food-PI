import './App.css';
import Main from './components/Main';
import Buscador from './components/Buscador';
import Create from './components/Create';
import Detalles from './components/Detalles';
import About from './components/About';
import React from 'react';
import { Route } from "react-router-dom";

function App() {

  return (
      <React.Fragment>
          <Route exact path="/" component={Main} />
          <Route path="/front" component={Buscador} />
          <Route path="/details/:id" component={Detalles} />
          <Route path="/create" component={Create} />
          <Route path="/about" component={About} />
      </React.Fragment>
      
    
  );
}

export default App;
