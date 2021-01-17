const Nav = ({ onLogout }) => {
  return (
    <ul className='nav nav-tabs'>
      <li className='nav-item'>
        <a className='nav-link' data-toggle='tab' href='#home'>
          Contacts
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' data-toggle='tab' href='#profile'>
          Favorites
        </a>
      </li>
      <li className='nav-item'>
        <a
          className='nav-link text-danger'
          data-toggle='tab'
          href='#profile'
          onClick={onLogout}>
          SignOut
        </a>
      </li>
    </ul>
  );
};

export default Nav;
