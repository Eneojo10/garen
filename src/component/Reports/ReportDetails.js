import React, { useState, useEffect, useContext } from 'react';
import Navigation from '../Navigation';
import Compo from '../Compo';
import { IoMdArrowDropdown } from 'react-icons/io';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SingleResidentProfile = () => {
  const { ireportId } = useParams();
  const [loadingStates, setLoadingStates] = useState({});
  const [ireport, setIreport] = useState(null);

  
  let is__isAdmin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isAdmin = is__isAdmin === 'ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;

  

  useEffect(() => {
    const fetchReport = async () => {
      setLoadingStates((prevState) => ({ ...prevState, [ireportId]: true }));
      try {
        const response = await axios.get(
          `http://localhost:5000/ireports/${ireportId}`
        );

        console.log(response.data);
        setIreport(response.data);

        const updatedIreport = { ...response.data, read: true };
        localStorage.setItem(
          'ireportsReadStatus',
          JSON.stringify({ [ireportId]: true })
        );
        setIreport(updatedIreport);
      } catch (error) {
      } finally {
        setLoadingStates((prevState) => ({
          ...prevState,
          [ireportId]: false,
        }));
      }
    };

    fetchReport();
  },[]);

  if (loadingStates[ireportId]) {
    return <div>Loading...</div>;
  }

  if (!ireport) {
    return null;
  }

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
              <h5>IREPORTS</h5>
              <br />
              <div className='resident-txt-field'>
                <div className='txt--inside d-flex justify-content-between'>
                  <div className='cisearch-icon d-flex gap-1'>
                    <div className='search--icon p-1'>
                      <Link to={`/ReportDetails/${ireportId}`}></Link>
                    </div>
                    <h4>View Ireports </h4>
                  </div>
                  <div>
                    <button className='dropdown-btn'>
                      <IoMdArrowDropdown />
                    </button>
                  </div>
                </div>
              </div>

              <div className='residents-border'>
                <div
                  className='ireport_image'
                  style={{ width: '95%', margin: 'auto' }}
                >
                  <div className='details_image py-4'>
                    <div className='details__image'>
                      <img src={ireport.avatar} alt='' />
                    </div>
                    <div className='details__image'>
                      <img src={ireport.avatar} alt='' />
                    </div>
                  </div>

                  <br />

                  <div>
                    <div>
                      <h5>Description:</h5>
                      <p>{ireport.description}</p>
                    </div>
                    <div>
                      <h5>Reported By:</h5>
                      <p>{ireport.user_id?.firstname}</p>
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
