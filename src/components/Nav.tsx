import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavProps {
  onLogout(): void;
}

const Nav: React.FC<NavProps> = ({ onLogout }) => {
  return (
    <div className='row'>
      <div className='col-md-12 p-2'>
        <ul className='nav nav-tabs'>
          <li className='nav-item'>
            <NavLink
              exact
              to='/'
              className='nav-link'
              activeStyle={{
                color: '#5CB85C',
              }}
              data-toggle='tab'>
              <h6>Contacts</h6>
            </NavLink>
          </li>

          <li className='nav-item'>
            <NavLink
              exact
              to='/favorites'
              className='nav-link'
              activeStyle={{
                color: '#5CB85C',
              }}
              data-toggle='tab'>
              <h6>Favorites</h6>
            </NavLink>
          </li>

          <li className='nav-item'>
            <div
              className='nav-link'
              style={{ cursor: 'pointer' }}
              data-toggle='tab'
              onClick={onLogout}>
              <h6>Logout</h6>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
