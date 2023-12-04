import React, { useState, useEffect, useRef, useContext } from 'react';
import Compo from '../Compo';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoMdArrowDropdown } from 'react-icons/io';
import Navigation from '../Navigation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Login/AuthContext';

function ResidentForm() {
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [created, setCreated] = useState('');
  const [phone, setPhone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [street, setStreet] = useState('');
  const [lastname, setLastname] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [house_number, setHouseNumber] = useState('');
  const [other_status, setOtherStatus] = useState('');
  const [residence_id, setResidence] = useState('');
  const [status_id, setStatus] = useState('');
  const [homes, setHomes] = useState(null);
  const [address, setAddress] = useState('');
  const [residenceStatus, setResidenceStatus] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [previousOwnerName, setPreviousOwnerName] = useState('');
  const [previousOwnerPhone, setPreviousOwnerPhone] = useState('');
  const [previousOwnerEmail, setPreviousOwnerEmail] = useState('');
  const navigate = useNavigate();
  const avatarInputRef = useRef(null);

  let is__isAdmin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isAdmin = is__isAdmin === 'ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;

  useEffect(() => {
    const formattedDate = new Date().toISOString().split('T')[0];
    setCurrentDate(formattedDate);
  });

  useEffect(() => {
    axios.get('http://localhost:5000/residence').then((response) => {
      setHomes(response.data);

      console.log(response);
    });
  });

  useEffect(() => {
    axios.get('http://localhost:5000/status').then((response) => {
      setResidenceStatus(response.data);

      console.log(response);
    });
  });

  const handleFnameChange = (event) => {
    setFirstname(event.target.value);
  };
  const handleLnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleHomeStatusChange = (event) => {
    setResidence(event.target.value);
  };

  const handleResidentStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCreatedChange = (event) => {
    const dateValue = event.target.valueAsDate;
    const formattedDate = dateValue.toISOString().split('T')[0];
    setCreated(formattedDate);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleOccupation = (event) => {
    setOccupation(event.target.value);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
  };

  const handlePreviousOwner = (event) => {
    setPreviousOwnerName(event.target.value);
  };

  const handlePreviousPhone = (event) => {
    setPreviousOwnerPhone(event.target.value);
  };

  const handlePreviousEmail = (event) => {
    setPreviousOwnerEmail(event.target.value);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleHouseNumberChange = (event) => {
    setHouseNumber(event.target.value);
  };

  const handleOtherStatusChange = (event) => {
    setOtherStatus(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async () => {
    

    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('created', created);
    formData.append('phone', phone);
    formData.append('occupation', occupation);
    formData.append('avatar', avatar);
    formData.append('street', street);
    formData.append('residence_id', residence_id);
    formData.append('house_number', house_number);
    formData.append('other_status', other_status);
    formData.append('address', address);
    formData.append('user_id', is_logged_in);
    // formData.append('previousOwnerEmail', previousOwnerEmail);
    // formData.append('previousOwnerPhone', previousOwnerPhone);
    // formData.append('previousOwnerName', previousOwnerName);

    try {
      const response = await axios.post(
        'http://localhost:5000/users',
        formData,
        {
          // timeout: 10000,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        console.log('Post created:', response.data);
        const currentDate = new Date().toISOString().split('T')[0];
        const redirectURL = `/allResidents?date=${currentDate}`;
        navigate(redirectURL);
        // ... rest of your code
      } else {
        console.error('Error creating post:', response);
      }

      setFirstname('');
      setLastname('');
      setEmail('');
      setStreet('');
      setAddress('');
      setOtherStatus('');
      setHouseNumber('');
      setOccupation('');
      setPhone('');
      setCreated('');
      setResidence('');
      setAvatar(null);
      setPreviousOwnerEmail('');
      setPreviousOwnerName('');
      setPreviousOwnerPhone('');
      setPassword('');

      if (avatarInputRef.current) {
        avatarInputRef.current.value = null;
      }
    } catch (error) {
      console.error('Error creating post:', error);
      console.log('Error details:', error.response.data);
    }

    
  };

  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div className='create_residents d-flex'>
          <div className='users'>
            <Compo />
          </div>
          <div className='users_'>
            <Navigation />
            <br />
            <div className='residents-form'>
              <h5>ADD RESIDENTS</h5>
              <br />
              <div className='resident-txt-field'>
                <div className='txt--inside d-flex justify-content-between'>
                  <div className='cisearch-icon d-flex gap-1'>
                    <div className='search--icon p-1'>
                      <HiOutlineSearch />
                    </div>
                    <h4>New Residents Form</h4>
                  </div>
                  <div>
                    <button className='dropdown-btn'>
                      <IoMdArrowDropdown />
                    </button>
                  </div>
                </div>
              </div>
              <div className='residents-border'>
                <div className='residents-details'>
                  <div className='text-details d-flex justify-content-between'>
                    <h4>First_Name:</h4>
                    <div>
                      <input
                        type='text'
                        name='fullname'
                        placeholder='Enter Your Full Name'
                        value={firstname}
                        onChange={handleFnameChange}
                        autoComplete='off'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='text-details d-flex justify-content-between'>
                    <h4>Last_Name:</h4>
                    <div>
                      <input
                        type='text'
                        name='lastname'
                        placeholder='Enter Your Last Name'
                        value={lastname}
                        onChange={handleLnameChange}
                        autoComplete='off'
                      />
                    </div>
                  </div>
                  <br />

                  <div className='text-details d-flex justify-content-between'>
                    <h4>Email:</h4>
                    <div>
                      <input
                        type='text'
                        name='email'
                        placeholder='Enter Email Address'
                        value={email}
                        onChange={handleEmailChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='text-details d-flex justify-content-between'>
                    <h4>Password:</h4>
                    <div>
                      <input
                        type='password'
                        name='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='new-password'
                      />
                    </div>
                  </div>
                  <br/>
                  <div className='text-details d-flex justify-content-between'>
                    <h4>Created on:</h4>
                    <div className='date-section'>
                      <input
                        type='date'
                        id='dateInput'
                        name='dateInput'
                        value={currentDate}
                        onChange={handleCreatedChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='text-details d-flex justify-content-between'>
                    <h4>Phone Number:</h4>
                    <div>
                      <input
                        type='text'
                        name='phone'
                        placeholder='Enter Phone Number'
                        value={phone}
                        onChange={handlePhoneChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />

                  <div className='text-details d-flex justify-content-between'>
                    <h4>Other Status:</h4>
                    <div>
                      <input
                        type='text'
                        name='other_status'
                        placeholder='Specify Other Status'
                        value={other_status}
                        onChange={handleOtherStatusChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='text-details d-flex justify-content-between'>
                    <h4>House Number:</h4>
                    <div>
                      <input
                        type='text'
                        name='house_number'
                        placeholder='Enter House Number'
                        value={house_number}
                        onChange={handleHouseNumberChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='text-details d-flex justify-content-between'>
                    <h4>Address:</h4>
                    <div>
                      <input
                        type='text'
                        name='address'
                        placeholder='Enter Address'
                        value={address}
                        onChange={handleAddressChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='text-details d-flex justify-content-between'>
                    <h4>Street:</h4>
                    <div>
                      <input
                        type='text'
                        name='street'
                        placeholder='Enter Street'
                        value={street}
                        onChange={handleStreetChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='text-details d-flex justify-content-between'>
                    <h4>Home Status:</h4>
                    <div className='sel-ect'>
                      <select
                        name='residence_id'
                        value={residence_id}
                        onChange={handleHomeStatusChange}
                      >
                        <option value=''>Select Home Status</option>
                        {homes &&
                          homes.map((e) => (
                            <option key={e._id} value={e._id}>
                              {e.category}
                            </option>
                          ))}
                      </select>
                      <label for='residents' id='residentsError'></label>
                    </div>
                  </div>
                  <br />
                  <div className='text-details d-flex justify-content-between'>
                    <h4>Resident Status:</h4>
                    <div className='sel-ect'>
                      <select
                        name='status_id'
                        value={status_id}
                        onChange={handleResidentStatusChange}
                      >
                        <option value=''>Select Resident Status</option>
                        {residenceStatus &&
                          residenceStatus.map((e) => (
                            <option key={e._id} value={e._id}>
                              {e.resident}
                            </option>
                          ))}
                      </select>
                      <label for='residents' id='residentsError'></label>
                    </div>
                  </div>
                  <br />

                  <div className='text-details d-flex justify-content-between'>
                    <h4>Occupation:</h4>
                    <div>
                      <input
                        type='text'
                        name='occupation'
                        placeholder='Enter Your Occupation'
                        value={occupation}
                        onChange={handleOccupation}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='text-details d-flex justify-content-between'>
                    <h4>Upload Photo:</h4>
                    <div className='residents_File'>
                      <input
                        type='file'
                        placeholder='Select photo'
                        name='avatar'
                        onChange={handleAvatarChange}
                      />
                    </div>
                  </div>
                  <br />
                  {/* <div className='text-details d-flex justify-content-between'>
                    <h4>Previous_Owner Name:</h4>
                    <div>
                      <input
                        type='text'
                        name='previousOwnerName'
                        placeholder='Enter Name'
                        value={previousOwnerName}
                        onChange={handlePreviousOwner}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='text-details d-flex justify-content-between'>
                    <h4>Previous_Owner Email:</h4>
                    <div>
                      <input
                        type='text'
                        name='previousOwnerEmail'
                        placeholder='Enter Email'
                        value={previousOwnerEmail}
                        onChange={handlePreviousEmail}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='text-details d-flex justify-content-between'>
                    <h4>Previous_Owner Phone:</h4>
                    <div>
                      <input
                        type='text'
                        name='previousOwnerPhone'
                        placeholder='Enter Phone No.'
                        value={previousOwnerPhone}
                        onChange={handlePreviousPhone}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br /> */}

                  <div className='resident-button'>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className='residents_button'
                    >
                      CREATE ACCOUNT
                    </button>
                  </div>
                </div>
                <div className='residents-details-media'>
                  <div className='te'>
                    <h6>First_Name:</h6>
                    <div>
                      <input
                        type='text'
                        name='fullname'
                        placeholder='Enter Your Full Name'
                        value={firstname}
                        onChange={handleFnameChange}
                        autoComplete='off'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='te'>
                    <h6>Last_Name:</h6>
                    <div>
                      <input
                        type='text'
                        name='lastname'
                        placeholder='Enter Your Last Name'
                        value={lastname}
                        onChange={handleLnameChange}
                        autoComplete='off'
                      />
                    </div>
                  </div>
                  <br />

                  <div className='te'>
                    <h6>Email:</h6>
                    <div>
                      <input
                        type='text'
                        name='email'
                        placeholder='Enter Email Address'
                        value={email}
                        onChange={handleEmailChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='tee'>
                    <h6>Created on:</h6>
                    <div className='sel-ects'>
                      <input
                        type='date'
                        id='dateInput'
                        name='dateInput'
                        value={currentDate}
                        onChange={handleCreatedChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='te'>
                    <h6>Phone Number:</h6>
                    <div>
                      <input
                        type='text'
                        name='phone'
                        placeholder='Enter Phone Number'
                        value={phone}
                        onChange={handlePhoneChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />

                  <div className='te'>
                    <h6>Other Status:</h6>
                    <div>
                      <input
                        type='text'
                        name='other_status'
                        placeholder='Specify Other Status'
                        value={other_status}
                        onChange={handleOtherStatusChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='te'>
                    <h6>House Number:</h6>
                    <div>
                      <input
                        type='text'
                        name='house_number'
                        placeholder='Enter House Number'
                        value={house_number}
                        onChange={handleHouseNumberChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='te'>
                    <h6>Address:</h6>
                    <div>
                      <input
                        type='text'
                        name='address'
                        placeholder='Enter Address'
                        value={address}
                        onChange={handleAddressChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='te'>
                    <h6>Street:</h6>
                    <div>
                      <input
                        type='text'
                        name='street'
                        placeholder='Enter Street'
                        value={street}
                        onChange={handleStreetChange}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='te'>
                    <h6>Home Status:</h6>
                    <div className='sel-ects'>
                      <select
                        name='residence_id'
                        value={residence_id}
                        onChange={handleHomeStatusChange}
                      >
                        <option value=''>Select Home Status</option>
                        {homes &&
                          homes.map((e) => (
                            <option key={e._id} value={e._id}>
                              {e.category}
                            </option>
                          ))}
                      </select>
                      <label for='residents' id='residentsError'></label>
                    </div>
                  </div>
                  <br />
                  <div className='te'>
                    <h6>Resident Status:</h6>
                    <div className='sel-ects'>
                      <select
                        name='status_id'
                        value={status_id}
                        onChange={handleResidentStatusChange}
                      >
                        <option value=''>Select Resident Status</option>
                        {residenceStatus &&
                          residenceStatus.map((e) => (
                            <option key={e._id} value={e._id}>
                              {e.resident}
                            </option>
                          ))}
                      </select>
                      <label for='residents' id='residentsError'></label>
                    </div>
                  </div>
                  <br />

                  <div className='te'>
                    <h6>Occupation:</h6>
                    <div>
                      <input
                        type='text'
                        name='occupation'
                        placeholder='Enter Your Occupation'
                        value={occupation}
                        onChange={handleOccupation}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />

                  <div className='te'>
                    <h6>Previous_Owner Name:</h6>
                    <div>
                      <input
                        type='text'
                        name='previousOwnerName'
                        placeholder='Enter Name'
                        value={previousOwnerName}
                        onChange={handlePreviousOwner}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='te'>
                    <h6>Previous_Owner Email:</h6>
                    <div>
                      <input
                        type='text'
                        name='previousOwnerEmail'
                        placeholder='Enter Email'
                        value={previousOwnerEmail}
                        onChange={handlePreviousEmail}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div className='te'>
                    <h6>Previous_Owner Phone:</h6>
                    <div>
                      <input
                        type='text'
                        name='previousOwnerPhone'
                        placeholder='Enter Phone No.'
                        value={previousOwnerPhone}
                        onChange={handlePreviousPhone}
                        autoComplete='none'
                      />
                    </div>
                  </div>
                  <br />
                  <div>
                    <h6>Upload Photo:</h6>
                    <div>
                      <input
                        type='file'
                        placeholder='Select photo'
                        name='avatar'
                        onChange={handleAvatarChange}
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
                      CREATE ACCOUNT
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

export default ResidentForm;
