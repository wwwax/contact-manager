import { NavLink } from 'react-router-dom';

const Nav = ({ onLogout }) => {
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
              <h5>Contacts</h5>
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
              <h5>Favorites</h5>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              exact
              to='/'
              className='nav-link'
              data-toggle='tab'
              onClick={onLogout}>
              <h5>Log Out</h5>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
