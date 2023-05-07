import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <div>
    <nav className="nav nav-tabs" >             
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/">Moneda Virtual</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/sobremoneda">SobreMoneda</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/infovideos">Videos</a>
      </li>
      <li class="nav-item" >
        <a class="nav-link" href="/invertir">Invertir</a>
      </li>
    </nav>
      <div className='navBtn'>
        <Link to="/registrarse" className='link'>
        <button className='btn'>Registrarse</button>
        </Link>
        <Link to="/acceder" className='link'>
        <button className='btn'>Acceder</button>
        </Link>
        </div>
    </div>
  );
};

export default Nav;
