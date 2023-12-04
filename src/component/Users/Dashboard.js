import React, { useState, useEffect} from 'react';
import Left from './Left';
import Navigations from './Navigations';
// import { Link } from 'react-router-dom';
import axios from 'axios';
// import image from '../image/user2.jpg'

function Dashboard() {
  const [artisan, setArtisan] = useState([]);
  // const [leftSidebarHeight, setLeftSidebarHeight] = useState(0);
  
 let is_admin = localStorage.getItem('role');
 let is_logged_in = localStorage.getItem('user_id');

 let user = is_admin === 'USER' ? true : false;
 let isLoggedIn = is_logged_in ? true : false;

//  const loggedInAdminId = 'user_id';

  
  // useEffect(() => {
  //   setLeftSidebarHeight(artisan.length * 200);  
  // },[]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const loggedInUserId = localStorage.getItem('user_id');

        const response = await axios.get(
          `http://localhost:5000/artisan?user_id=${loggedInUserId}`
          // {
          //   params: {
          //     // role: 'USER',
          //     user_id: loggedInUserId,
          //   },
          // }
        );

        setArtisan(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReport();
  },[]);


  
  return (
    <div>
      {isLoggedIn && user ? (
        <div className='dash_board d-flex'>
          <div className='users'>
            <Left />
          </div>

          <div className='users_'>
            <Navigations />
            <br />

            <div className='dashboard-border'>
              <div className='dashboard--border'>
                <div
                  className='dash_text'
                  style={{ textAlign: 'center', marginTop: '55px' }}
                >
                  <h4>Advertise Here...</h4>
                </div>
              </div>
              <br />
              <br />

              <div>
                <h5>Artisan Directory</h5>
              </div>
              <br />

              <div className='artisan_details'>
                {artisan.map((artItem, index) => (
                  <div className='border' key={index}>
                    <div className='card_one'>
                      <div className='artisanImage'>
                        <img src={artItem.avatar} alt='' />
                      </div>
                      <div
                        className='artisan_text mt-4'
                        style={{
                          width: '67%',
                          margin: 'auto',
                          textAlign: 'center',
                        }}
                      >
                        <h5>{artItem.artisanFullname}</h5>
                        <p>{artItem.artisanSpecialty}</p>
                        <p>{artItem.artisanContact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='artisan_details_'>
                {artisan.map((artisanItem, index) => (
                  <div className='bor-der' key={index}>
                    <div className='card_one'>
                      <div className='artisanImage'>
                        <img src={artisanItem.avatar} alt='' />
                      </div>
                      <div
                        className='artisan_text mt-4'
                        style={{
                          width: '67%',
                          margin: 'auto',
                          textAlign: 'center',
                        }}
                      >
                        <h5>{artisanItem.artisanFullname}</h5>
                        <p>{artisanItem.artisanSpecialty}</p>
                        <p>{artisanItem.artisanContact}</p>
                        {/* <p>{artisanItem.address}</p> */}
                      </div>

                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>You do not have the permission to view this page</>
      )}

      <br />
    </div>
  );
}

export default Dashboard;
