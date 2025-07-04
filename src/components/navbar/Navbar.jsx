import React from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import Search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import profile_icon from '../../assets/jack.png';
import { Link } from 'react-router-dom';

const Navbar = ({ setSidebar }) => {
  return (
    <nav className='flex-div'>
      <div className='nav-left flex-div'>
        <img
          className="menu_icon"
          onClick={() => setSidebar(prev => !prev)}
          src={menu_icon}
          alt="Toggle sidebar"
        />
        <Link to='/'>
          <img className="logo" src={logo} alt="Site logo" />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="Search-box flex-div">
          <input type="text" placeholder='Search' />
          <img src={Search_icon} alt='Search icon' />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="Upload" />
        <img src={more_icon} alt="More options" />
        <img src={notification_icon} alt="Notifications" />
        <img src={profile_icon} className="user_icon" alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
