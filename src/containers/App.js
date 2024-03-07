import React from 'react';
import './App.css';
import Nav from '../components/Nav.jsx';
import Home from '../components/Home.jsx';
import { Route, Switch } from 'react-router-dom';
import SobreMoneda from "../components/SobreMoneda"
import Info from '../components/Info';
import Registrarse from "../components/Registrarse"
import Invertir from '../components/Invertir';
import Acceder from '../components/Acceder';
import HomeInversores from '../components/HomeInversores';
import Vender from '../components/vender';
import Comprar from '../components/Comprar';
import TerminosCond from '../components/Terminos'; 

function App() {
  return (
    <div className="app">
      <Switch >
        <Route exact path="/"> 
          <Nav/>
          <Home/>
        </Route>
        <Route path="/sobremoneda"> 
          <Nav/>
          <SobreMoneda/>
        </Route>
        <Route path="/infovideos"> 
          <Nav/>
          <Info/>
        </Route>
        <Route path="/invertir"> 
          <Nav/>
          <Invertir/>
        </Route>
        <Route path="/registrarse"> 
          <Nav/>
          <Registrarse/>
        </Route>
        <Route path="/acceder"> 
          <Nav/>
          <Acceder/>
        </Route>
        <Route path="/terminosycondiciones"> 
          <Nav/>
          <TerminosCond/>
        </Route>
        <Route path="/home/:id" render={({match})=>  
          < HomeInversores id={(match.params.id)} /> }/>
        <Route path="/vender/:user/:id/:saldo/:usercomp" render={({match})=>
          <Vender id={(match.params.id)} /> } />
        <Route path="/comprar/:user/:id/:saldo/:usercomp" render={({match})=>
          <Comprar id={(match.params.id)} /> } />
      </Switch>
    </div>
  );
}

export default App;
