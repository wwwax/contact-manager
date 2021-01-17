import { Link } from 'react-router-dom';

const Nav = ({ onLogout }) => {
  return (
    <div className='row'>
      <div className='col-md-12 p-2'>
        <ul className='nav nav-tabs'>
          <li className='nav-item'>
            <Link to='/' className='nav-link' data-toggle='tab'>
              Contacts
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/favorites' className='nav-link' data-toggle='tab'>
              Favorites
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/'
              className='nav-link text-danger'
              data-toggle='tab'
              onClick={onLogout}>
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
