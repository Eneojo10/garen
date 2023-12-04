import React from 'react';
import { BsBarChart } from 'react-icons/bs';
import { RiHome4Fill } from 'react-icons/ri';
import { CiSquareQuestion } from 'react-icons/ci';
import { GoSignIn } from 'react-icons/go';
import { Link } from 'react-router-dom';

import image from '../image/logo_image.png';


function Left() {


  let is_admin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isAdmin = is_admin === 'USER' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;

  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div className='main-panel'>
          <div className='bg-txt'>
            <br />
            <div className='bgg text-white p-2'>
              <img src={image} alt='' />
            </div>

            <div className='border-line'></div>
          </div>
          <br />
          <div className='dashboard'>
            <div className='dash_board'>
              <Link className='line' to='/dashboard'>
                <div className='dash d-flex text-white gap-3 p-2'>
                  <div>
                    <BsBarChart />
                  </div>
                  <div className='manage mt-1'>
                    <h6>Dashboard</h6>
                  </div>
                </div>
              </Link>
              <div className='dash d-flex text-white p-2'>
                <div>
                  <RiHome4Fill />
                </div>
                <div
                  className='accordion accordion-flush'
                  id='accordionFlushExample'
                >
                  <div className='accordion-item'>
                    <h5 className='accordion-header' id='flush-headingOne'>
                      <button
                        className='a-btn accordion-button collapsed bg-black text-white'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#flush-collapseOne'
                        aria-expanded='false'
                        aria-controls='flush-collapseOne'
                      >
                        <div className='manage mt-2'>
                          <h6>Manage Payments</h6>
                        </div>
                      </button>
                    </h5>
                    <div
                      id='flush-collapseOne'
                      class='accordion-collapse collapse'
                      aria-labelledby='flush-headingOne'
                      data-bs-parent='#accordionFlushExample'
                    >
                      <div className='accordion-body text-white bg-black'>
                        <Link to={'#'} className='line'>
                          <p>Send Proof of Payments</p>
                        </Link>
                        <Link to={'#'} className='line'>
                          <p>View Payments History</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='dash2 d-flex text-white p-2'>
                <div>
                  <CiSquareQuestion />
                </div>

                <div
                  className='accordion accordion-flush'
                  id='accordionFlushExample'
                >
                  <div className='accordion-item'>
                    <h5 className='accordion-header' id='flush-headingFive'>
                      <button
                        className='a-btn accordion-button collapsed bg-black text-white'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#flush-collapseFive'
                        aria-expanded='false'
                        aria-controls='flush-collapseFive'
                      >
                        <div className='manage mt-2'>
                          <h6>iReport</h6>
                        </div>
                      </button>
                    </h5>
                    <div
                      id='flush-collapseFive'
                      class='accordion-collapse collapse'
                      aria-labelledby='flush-headingFive'
                      data-bs-parent='#accordionFlushExample'
                    >
                      <div className='accordion-body text-white bg-black'>
                        <Link to={'/ireport'} className='line'>
                          <p>Send Report</p>
                        </Link>
                        <Link to={'/history'} className='line'>
                          <p>View Report History</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link className='line' to='#'>
                <div className='dash d-flex text-white gap-3 p-2'>
                  <div>
                    <GoSignIn />
                  </div>
                  <div className='manage mt-1'>
                    <h6>Help & FAQ</h6>
                  </div>
                </div>
              </Link>
            </div>

            {/* <br />
          <br />
          <div className='drk'>
            <Dark />
          </div>
          <br />
          <br />
          <br />
          <br />

          <Logout /> */}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Left;
