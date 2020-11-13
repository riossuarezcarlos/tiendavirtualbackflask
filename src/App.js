import React from 'react';
import Routes from './Routes'
import { Switch, BrowserRouter as Router} from 'react-router-dom'

import AuthContextProvider from './context/authContext';
import CarritoContextProvider from './context/carritoContext';
import NavSideContextProvider from './context/navSideContext';

import CNavbar from './components/CNavbar';
import './App.css';
 
function App() {
  return (
    <Router>
      <NavSideContextProvider>
        <AuthContextProvider>
          <CarritoContextProvider>
            <CNavbar/>
            <div className="container">
              <Switch>
                <Routes />
              </Switch>
            </div>
          </CarritoContextProvider>
        </AuthContextProvider>
      </NavSideContextProvider>
    </Router>
  );
}

export default App;