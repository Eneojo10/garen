import React, { useState, useRef, useEffect } from 'react';
import Navigation from '../Navigation';
import Compo from '../Compo';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { IoMdArrowDropdown } from 'react-icons/io';

function AddArtisan() {
  const [artisanData, setArtisanData] = useState({
    artisanFullname: '',
    artisanSpecialty: '',
    artisanContact: '',
    user_id: '',
    avatar: null,
  });

  useEffect(() => {
    
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setArtisanData({ ...artisanData, user_id: storedUserId });
    }
  },[]); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setArtisanData({
      ...artisanData,
      [name]: value,
    });
  };

  const handleAvatarChange = (event) => {
    setArtisanData({
      ...artisanData,
      avatar: event.target.files[0],
    });
  };

  let is__isAdmin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isAdmin = is__isAdmin === 'ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;

  const handleSubmit = async () => {
  

    const formData = new FormData();
    formData.append('avatar', artisanData.avatar);
    formData.append('artisanFullname', artisanData.artisanFullname);
    formData.append('artisanSpecialty', artisanData.artisanSpecialty);
    formData.append('artisanContact', artisanData.artisanContact);
    formData.append('user_id', is_logged_in);
   

    try {
      const response = await axios.post(
        'http://localhost:5000/artisan',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      console.log('Artisan added:', response.data);

      setArtisanData({
        artisanFullname: '',
        artisanSpecialty: '',
        artisanContact: '',
        user_id: '', 
        avatar: null,
      });

      toast.success('Artisan addedd successfully', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error('Error adding artisan:', error);
      
      toast.error('Error adding artisan. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      {isLoggedIn && isAdmin ? (
        <div className='artisan d-flex'>
          <div className='artisan_left'>
            <Compo />
          </div>

          <div className='users_'>
            <Navigation />
            <br />

            <div className='artisan_field'>
              <h5>ARTISAN</h5>
              <br />

              <div className='resident-txt-field'>
                <div className='txt--inside d-flex justify-content-between'>
                  <div className='cisearch-icon d-flex gap-1'>
                    <h4>Add Artisan</h4>
                  </div>
                  <div>
                    <button className='dropdown-btn'>
                      <IoMdArrowDropdown />
                    </button>
                  </div>
                </div>
              </div>

              <div className='artisan-border'>
                <div className='atisan--input-field'>
                  <div className='arti-san-field d-flex justify-content-between'>
                    <h6>Full Name</h6>
                    <div>
                      <input
                        type='text'
                        placeholder='Enter Full Name'
                        name='artisanFullname'
                        value={artisanData.artisanFullname}
                        onChange={handleInputChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='arti-san-field d-flex justify-content-between'>
                    <h6>Artisan Specialty</h6>
                    <div>
                      <input
                        type='text'
                        placeholder='Enter Specialty'
                        name='artisanSpecialty'
                        value={artisanData.artisanSpecialty}
                        onChange={handleInputChange}
                        autoComplete='no'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='arti-san-field d-flex justify-content-between'>
                    <h6>Artisan Contact</h6>
                    <div>
                      <input
                        type='text'
                        placeholder='Enter phone Number'
                        name='artisanContact'
                        value={artisanData.artisanContact}
                        onChange={handleInputChange}
                        autoComplete='no'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='arti-san-field d-flex justify-content-between'>
                    <h6>Avatar</h6>
                    <div>
                      <input
                        type='file'
                        placeholder='Enter phone Number'
                        name='avatar'
                        onChange={handleAvatarChange}
                        autoComplete='no'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='resident-button'>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className='residents_button'
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
              <div className='artisan-border_'>
                <div className='atisan--inputfield'>
                  <div className='arti-san-field'>
                    <h6>Artisan Fullname</h6>
                    <div>
                      <input
                        type='text'
                        placeholder='Enter Full Name'
                        name='artisanFullname'
                        value={artisanData.artisanFullname}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className='arti-san-field'>
                    <h6>Artisan Sepcialty</h6>
                    <div>
                      <input
                        type='text'
                        placeholder='Enter Email'
                        name='artisanSpecialty'
                        value={artisanData.artisanSpecialty}
                        onChange={handleInputChange}
                        autoComplete='no'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='arti-san-field'>
                    <h6>Phone Number</h6>
                    <div>
                      <input
                        type='text'
                        placeholder='Enter phone Number'
                        name='artisanContact'
                        value={artisanData.artisanContact}
                        onChange={handleInputChange}
                        autoComplete='no'
                      />
                    </div>
                  </div>

                  <div className='resident-button'>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className='residents_button'
                    >
                      SUBMIT
                    </button>
                  </div>
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

export default AddArtisan;
