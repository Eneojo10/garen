import React, { useState, useEffect, useContext } from 'react';
import Navigation from '../Navigation';
import Compo from '../Compo';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const SingleResidentProfile = () => {
  const [residence, setResidence] = useState(null);
  const { usersId } = useParams();
  const [inputDate, setInputDate] = useState('');
  const [identificationCode, setIdentificationCode] = useState('');

  let is__isAdmin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isAdmin = is__isAdmin === 'ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;


  useEffect(() => {
    fetchResidenceData();
  },[]);

  const fetchResidenceData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/${usersId}`
      );
      console.log(response);
      setResidence(response.data);
      setIdentificationCode(response.data.identificationCode || '');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (residence && residence.created) {
      if (residence.created === '') {
        setInputDate('No creation date available');
      } else {
        const createdDate = new Date(residence.created);
        if (!isNaN(createdDate.getTime())) {
          const formattedDate = createdDate.toLocaleDateString();
          setInputDate(formattedDate);
        } else {
          setInputDate('Invalid Date');
        }
      }
    }
  }, [residence]);

  if (!residence) {
    return <div>Loading...</div>;
  }

  const formatIdentificationCode = (code) => {
    const numDigits = 3;
    return code.toString().padStart(numDigits, '0');
  };

  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div className='profile_ d-flex'>
          <div className='users'>
            <Compo />
          </div>
          <div className='users_'>
            <Navigation />
            <br />
            <div className='residents-form'>
              <h5>RESIDENCE PROFILE</h5>
              <br />
              <div className='resident-txt-field'>
                <div className='txt--inside d-flex justify-content-between'>
                  <div className='cisearch-icon d-flex gap-1'>
                    <div className='search--icon p-1'>
                      <Link
                        to={`/residence/${usersId}/${identificationCode}`}
                      ></Link>
                    </div>
                    <h4>View Residence</h4>
                  </div>
                  <div>
                    <button className='dropdown-btn'>
                      <IoMdArrowDropdown />
                    </button>
                  </div>
                </div>
              </div>
              <div className='residents-border py-4'>
                <div className='pro-file p-4'>
                  <div className='profile-details'>
                    <div className='text-details'>
                      <h4>Identification Code:</h4>
                      <div>
                        <input
                          type='text'
                          value={formatIdentificationCode(identificationCode)}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />

                    <div className='text-details'>
                      <strong>First Name:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.firstname}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className='text-details'>
                      <strong>Last Name:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.lastname}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />

                    <div className='text-details'>
                      <strong>Email:</strong>
                      <div>
                        <input type='text' value={residence.email} readOnly />
                      </div>
                    </div>
                    <br />
                    <div className='text---details'>
                      <strong>Created on:</strong>
                      <div className='da_te'>
                        <input type='text' value={inputDate} readOnly />
                      </div>
                    </div>
                    <br />
                    <div className='text-details'>
                      <strong>Phone Number:</strong>
                      <div>
                        <input type='text' value={residence.phone} readOnly />
                      </div>
                    </div>
                    <br />
                    <div className='text---details'>
                      <strong>Home Status:</strong>
                      <div className='da_te'>
                        <input
                          type='text'
                          value={residence.residence_id?.category}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className='text---details'>
                    <strong>Resident Status:</strong>
                    <div className='da_te'>
                      <input
                        type='text'
                        value={residence.status_id.resident}
                        readOnly
                      />
                    </div>
                  </div>
                    <br />
                    <div className='text-details'>
                      <strong>Other Status:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.other_status}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className='text-details'>
                      <strong>House Number:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.house_number}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className='text-details'>
                      <strong>Street:</strong>
                      <div>
                        <input type='text' value={residence.street} readOnly />
                      </div>
                    </div>
                    <br />

                    <div className='text-details'>
                      <strong>Occupation:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.occupation}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    {/* <div className='text-details'>
                      <strong>Previous Owner Name:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.previousOwnerName}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className='text-details'>
                      <strong>Previous Owner Email:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.previousOwnerEmail}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className='text-details'>
                      <strong>Previous Owner Phone No.:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.previousOwnerPhone}
                          readOnly
                        />
                      </div>
                    </div> */}
                  </div>
                  <div className='profile-section'>
                    <div className='profile__image'>
                      {residence && residence.avatar ? (
                        <img src={residence.avatar} alt='' />
                      ) : (
                        <p>No avatar available</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className='media_profile'>
                  <div className='all_mediainput'>
                    <div className='med_profile'>
                      <strong>Identification Code:</strong>
                      <div>
                        <input
                          type='text'
                          value={formatIdentificationCode(identificationCode)}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className='med_profile'>
                      <strong>First Name:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.firstname}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className='med_profile'>
                      <strong>Last Name:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.lastname}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className='med_profile'>
                      <strong>Email:</strong>
                      <div>
                        <input type='text' value={residence.email} readOnly />
                      </div>
                    </div>
                    <br />
                    <div className='med_profile'>
                      <strong>Created on:</strong>
                      <div className='da_te'>
                        <input type='text' value={inputDate} readOnly />
                      </div>
                    </div>
                    <br />
                    <div className='med_profile'>
                      <strong>Phone Number:</strong>
                      <div>
                        <input type='text' value={residence.phone} readOnly />
                      </div>
                    </div>
                    <br />
                    <div className='med_profile'>
                      <strong>Home Status:</strong>
                      <div className='da_te'>
                        <input
                          type='text'
                          value={residence.residence_id?.category}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className='med_profile'>
                      <strong>Other Status:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.other_status}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className='med_profile'>
                      <strong>House Number:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.house_number}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className='med_profile'>
                      <strong>Street:</strong>
                      <div>
                        <input type='text' value={residence.street} readOnly />
                      </div>
                    </div>
                    <br />
                    <div className='med_profile'>
                      <strong>Occupation:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.occupation}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    {/* <div className='med_profile'>
                      <strong>Previous Owner Name:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.occupation}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className='med_profile'>
                      <strong>Previous Owner Email:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.occupation}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className='med_profile'>
                      <strong>Previous Owner Phone No.:</strong>
                      <div>
                        <input
                          type='text'
                          value={residence.occupation}
                          readOnly
                        />
                      </div>
                    </div> */}
                  </div>

                  <div className='media__profile-section'>
                    <div className='profile__image'>
                      {residence && residence.avatar ? (
                        <img src={residence.avatar} alt='' />
                      ) : (
                        <p>No avatar available</p>
                      )}
                    </div>
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
};

export default SingleResidentProfile;
