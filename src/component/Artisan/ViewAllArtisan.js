import React, { useState, useEffect, useContext } from 'react';
import Compo from '../Compo';
import Navigation from '../Navigation';
import image from '../image/user2.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';

function AddArtisan() {
  const [artisan, setArtisan] = useState([]);

  useEffect(() => {
    fetchArtisan();

    const estateId = localStorage.getItem('estate_id');
    if (!estateId) {
      const newEstateId = 'estate_id';
      localStorage.setItem('estate_id', newEstateId);
    }
  }, []);



  let is__isAdmin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isAdmin = is__isAdmin === 'ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;



  const fetchArtisan = async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      const response = await axios.get('http://localhost:5000/artisan', {
        params: {
          user_id,
        },
      }

      );
      console.log('Response:', response.data.data);
      setArtisan(response.data);
    }catch(error) {
      console.error('Error fetching data from URL:', error);
    }
  };

  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div className='generate_report d-flex'>
          <div className='users'>
            <Compo />
          </div>

          <div className='users_'>
            <Navigation />
            <br />

            <div className='artisan' style={{ width: '90%', margin: 'auto' }}>
              <h5>View All Artisans</h5>
              <br />
              <br />
              <div className='artisan_details'>
                {artisan.map((artisanItem, index) => (
                  <div className='border' key={index}>
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
                        <img src={image} alt='' />
                      </div>
                      <div
                        className='artisan_text mt-4'
                        style={{
                          width: '67%',
                          margin: 'auto',
                          textAlign: 'center',
                        }}
                      >
                        <h5>{artisanItem.fullname}</h5>
                        <p>{artisanItem.phone}</p>
                        <p>{artisanItem.email}</p>
                        <p>{artisanItem.address}</p>
                      </div>

                      <Link to={`/artisan/${artisanItem.id}`}>
                        <div className='artisan_info'>
                          <div className='info--btn'>
                            <i>View All Information</i>
                          </div>
                        </div>
                      </Link>
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
    </div>
  );
}

export default AddArtisan;
