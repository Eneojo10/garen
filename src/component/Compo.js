import React from 'react';
import { BsBarChart } from 'react-icons/bs';
import { RiHome4Fill } from 'react-icons/ri';
import { AiTwotoneMoneyCollect } from 'react-icons/ai';
import { CiSquareQuestion } from 'react-icons/ci';
import { SiEditorconfig } from 'react-icons/si';
import { GoSignIn } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { TbReportSearch } from 'react-icons/tb';
// import { FiUsers } from 'react-icons/fi';
import Dark from './Dark';
import image from './image/logo_image.png';



function Compo() {

  return (
    <div>
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
            <Link className='line' to='/panel'>
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
                        <h6>Manage Resident</h6>
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
                      <Link to={'/ResidentForm'} className='line'>
                        <p>Create New Residents</p>
                      </Link>
                      <Link to={'/allResidents'} className='line'>
                        <p>View All Residents</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='dash2 d-flex text-white p-2'>
              <div>
                <AiTwotoneMoneyCollect />
              </div>
              <div
                className='accordion accordion-flush'
                id='accordionFlushExample'
              >
                <div className='accordion-item'>
                  <h5 className='accordion-header' id='flush-headingTwo'>
                    <button
                      className='a-btn accordion-button collapsed bg-black text-white'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#flush-collapseTwo'
                      aria-expanded='false'
                      aria-controls='flush-collapseTwo'
                    >
                      <div className='manage mt-2'>
                        <h6>Manage Payments</h6>
                      </div>
                    </button>
                  </h5>
                  <div
                    id='flush-collapseTwo'
                    class='accordion-collapse collapse'
                    aria-labelledby='flush-headingTwo'
                    data-bs-parent='#accordionFlushExample'
                  >
                    <div className='accordion-body text-white bg-black'>
                      <Link to={'/addpayments'} className='line'>
                        <p>Add Payments</p>
                      </Link>
                      <Link to={'/paymentsInfo'} className='line'>
                        <p>Sort Payments Info</p>
                      </Link>
                      <Link to={'/compliance'} className='line'>
                        <p>View Compliance</p>
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
                        <h6>Manage iRequests</h6>
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
                      <Link to={'/pending'} className='line'>
                        <p>Pending iReports</p>
                      </Link>
                      <Link to={'/viewReports'} className='line'>
                        <p>View All iReports</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link className='line' to={`/generate`}>
              <div className='dash2 d-flex text-white gap-3 p-2'>
                <div>
                  <TbReportSearch />
                </div>
                <div className='manage mt-1'>
                  <h6>Generate Reports</h6>
                </div>
              </div>
            </Link>

            {/* <Link className='line' to={`/users`}>
              <div className='dash d-flex text-white gap-3 p-2'>
                <div>
                  <FiUsers />
                </div>
                <div className='manage mt-1'>
                  <h6>Manage Users</h6>
                </div>
              </div>
            </Link> */}

            <Link className='line' to={`/config`}>
              <div className='dash d-flex text-white gap-3 p-2'>
                <div>
                  <SiEditorconfig />
                </div>
                <div className='manage mt-1'>
                  <h6>Configuration</h6>
                </div>
              </div>
            </Link>
            <Link className='line' to='#'>
              <div className='dash d-flex text-white gap-3 p-2'>
                <div>
                  <GoSignIn />
                </div>
                <div className='manage mt-1'>
                  <h6>Help</h6>
                </div>
              </div>
            </Link>
          </div>

          <div className='dash d-flex text-white p-2'>
            <div>
              <RiHome4Fill />
            </div>
            <div
              className='accordion accordion-flush'
              id='accordionFlushExample'
            >
              <div className='accordion-item'>
                <h5 className='accordion-header' id='flush-headingSx'>
                  <button
                    className='a-btn accordion-button collapsed bg-black text-white'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#flush-collapseSx'
                    aria-expanded='false'
                    aria-controls='flush-collapseSx'
                  >
                    <div className='manage mt-2'>
                      <h6>Manage Artisan</h6>
                    </div>
                  </button>
                </h5>
                <div
                  id='flush-collapseSx'
                  class='accordion-collapse collapse'
                  aria-labelledby='flush-headingSx'
                  data-bs-parent='#accordionFlushExample'
                >
                  <div className='accordion-body text-white bg-black'>
                    <Link to={'/addartisan'} className='line'>
                      <p>Add New Artisan</p>
                    </Link>
                    <Link to={'/viewall'} className='line'>
                      <p>View All Artisan</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className='drk'>
            <Dark />
          </div>
          <br />
          <br />
          <br />
          <br />

          {/* <Logout /> */}
        </div>
      </div>
    </div>
  );
}

export default Compo;
