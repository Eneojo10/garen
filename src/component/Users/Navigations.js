import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { IoMdArrowDropdown } from 'react-icons/io';
import SearchForm from '../SearchForm';
import Logout from '../Login/Logout';
import { AuthContext } from '../Login/AuthContext';
import Hamburger2 from '../Hamburgers/Hamburger2';
import axios from 'axios';

function Navigations() {
  // const { fullname } = useContext(AuthContext);

  let is_user = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');
  let fullname = localStorage.getItem('firstname');

  let user = is_user === 'USER' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;

  const [notifications, setNotifications] = useState(0);

  const fetchUnreadNotificationCount = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/ireports/notifications/${user_id}`
      );
      console.log(user_id);
      console.log(response.data);
      setNotifications(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn && fullname) {
      const user_id = localStorage.getItem('user_id');

      fetchUnreadNotificationCount(user_id);
    }
  }, [isLoggedIn, fullname]);

  return (
    <div>
      {isLoggedIn && user ? (
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
                  <Hamburger2 />
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
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navigations;
