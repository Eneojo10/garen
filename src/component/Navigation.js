import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGear } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { IoMdArrowDropdown } from 'react-icons/io';
import SearchForm from './SearchForm';
import Logout from './Login/Logout';
import Hamburger from './Hamburgers/Hamburger';
import axios from 'axios';

const fetchUnreadNotificationCount = async (user_id, setNotifications) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/ireports/notifications/${user_id}`
    );
    // console.log(user_id);
    console.log(response.data);
    setNotifications(response.data.length);
  } catch (error) {
    console.log(error);
  }
};

function Navigation() {
  let is__isAdmin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');
  let fullname = localStorage.getItem('fullname');

  let isAdmin = is__isAdmin === 'ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;

  const [notifications, setNotifications] = useState(0);

  // const fetchUnreadNotificationCount = async (user_id) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/ireports/notifications/${user_id}`
  //     );
  //     console.log(user_id);
  //     console.log(response.data);
  //     setNotifications(response.data.length);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (isLoggedIn && fullname) {
      const user_id = localStorage.getItem('user_id');
      fetchUnreadNotificationCount(user_id, setNotifications);
    }
  }, [isLoggedIn, fullname, setNotifications]);

  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div className='navi-gation'>
          <div
            className='nav_gation'
            style={{ width: '97%', margin: 'auto', paddingTop: '10px' }}
          >
            <div
              className='navigation_items d-flex'
              style={{ justifyContent: 'space-between' }}
            >
              <div className='search_barr'>
                <div className='ham'>
                  <Hamburger />
                </div>
                <form className='example'>
                  <SearchForm />
                </form>
              </div>
              <div className='not-fications d-flex gap-1'>
                <ul class='btn-group'>
                  <button
                    className='dropdown-btn btn-sm'
                    type='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ width: '35%' }}
                    ></FontAwesomeIcon>
                    <IoMdArrowDropdown />
                  </button>
                  <ul className='dropdown-menu'>
                    <div
                      className='user___details'
                      style={{ width: '95%', margin: 'auto' }}
                    >
                      {isLoggedIn && <li>{fullname}</li>}
                      <br />
                      <div className='nav_settings d-flex gap-2'>
                        <FontAwesomeIcon
                          icon={faGear}
                          style={{ marginTop: '4px' }}
                        ></FontAwesomeIcon>
                        <div>
                          <button
                            className='settings_btn'
                            style={{
                              border: 'none',
                              background: 'transparent',
                              color: 'black',
                              fontWeight: '600',
                            }}
                          >
                            Settings
                          </button>
                        </div>
                      </div>
                      <br />
                      <Logout />
                    </div>
                  </ul>
                </ul>

                <div className='nav-bell mt-2' style={{ position: 'relative' }}>
                  <button
                    className='nav--btn'
                    style={{ border: 'none', background: 'transparent' }}
                  >
                    <FontAwesomeIcon
                      icon={faBell}
                      color={'black'}
                    ></FontAwesomeIcon>
                    {notifications > 0 && (
                      <span
                        className='notification-count'
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '-10px',
                          backgroundColor: 'red',
                          borderRadius: '32px',
                          color: 'white',
                          fontWeight: '700',
                          padding: '0px 6px',
                          fontSize: '13px',
                        }}
                      >
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>You do not have the permission to view this page</>
      )}
    </div>
  );
}

export default Navigation;
