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
                color: '#DF691A',
              }}
              data-toggle='tab'>
              Contacts
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              exact
              to='/favorites'
              className='nav-link'
              activeStyle={{
                color: '#DF691A',
              }}
              data-toggle='tab'>
              Favorites
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              exact
              to='/'
              className='nav-link'
              data-toggle='tab'
              onClick={onLogout}>
              Log Out
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
