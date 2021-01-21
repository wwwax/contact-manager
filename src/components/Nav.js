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
            <div
              className='nav-link'
              style={{ cursor: 'pointer' }}
              data-toggle='tab'
              onClick={onLogout}>
              <h5>Logout</h5>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
