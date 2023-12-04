import React, { useState, useEffect, useContext } from 'react';
import Compo from '../Compo';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoMdArrowDropdown } from 'react-icons/io';
import Navigation from '../Navigation';
import axios from 'axios';
import { ReportContext } from './ReportContext';
import { Link } from 'react-router-dom';


function PendingiReports() {
  const [ireport, setIreport] = useState([]);
  const [pendingReports, setPendingReports] = useState([]);
  const { viewedReports, markReportAsViewed } = useContext(ReportContext);

  
  let is__isAdmin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isAdmin = is__isAdmin === 'ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ireports');
        setIreport(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReport();
  },[]);

  const updateLocalStorage = (pendingReportsData) => {
    const readStatus = pendingReportsData.reduce((status, ireport) => {
      status[ireport._id] = ireport.read;
      return status;
    }, {});

    localStorage.setItem(
      'pendingReportsReadStatus',
      JSON.stringify(readStatus)
    );
  };

  const handleViewIreport = (ireportId) => {
    const updatedPendingReports = pendingReports.map((item) => {
      if (item._id === ireportId) {
        return {
          ...item,
          read: true,
        };
      }
      return item;
    });

    setPendingReports(updatedPendingReports);
    updateLocalStorage(updatedPendingReports);
    markReportAsViewed(ireportId);

    localStorage.setItem('viewedReports', JSON.stringify(viewedReports));
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
            <div
              className='residents--form'
              style={{ width: '97%', margin: 'auto' }}
            >
              <h5>PENDING IREPORTS</h5>
              <br />
              <div className='resident-txt-field'>
                <div className='txt--inside d-flex justify-content-between'>
                  <div className='cisearch-icon d-flex gap-1'>
                    <div className='search--icon p-1'>
                      <HiOutlineSearch />
                    </div>
                    <h4>Filter iReports List</h4>
                  </div>
                  <div class='btn-group'>
                    <button
                      class='dropdown-btn btn-sm'
                      type='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <IoMdArrowDropdown />
                    </button>
                  </div>
                </div>
              </div>
              <div className='all-residents_'>
                <div className='all_residents-inputfield'>
                  <div className='input-field'>
                    <input
                      type='text'
                      placeholder='Enter identification code'
                    />
                  </div>
                  <div className='input-field'>
                    <input type='text' placeholder='Filter By Risk' />
                  </div>
                  <div className='input-field'>
                    <input type='text' placeholder='Filter By Date' />
                  </div>
                  <div>
                    <button className='all__residents-btn'>FILTER LIST</button>
                  </div>
                </div>
                <div className='all_residents--inputfield'>
                  <div className='media_input d-flex gap-3'>
                    <div className='input-field'>
                      <input type='text' placeholder='Enter code' />
                    </div>
                    <div className='input-field'>
                      <input type='text' placeholder='Filter By Risk' />
                    </div>
                  </div>
                  <br />
                  <div className='media-input d-flex gap-3'>
                    <div className='input-field'>
                      <input type='text' placeholder='Filter By Date' />
                    </div>
                    <div>
                      <button className='all__residents-btn'>
                        FILTER LIST
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <div className='table__records'>
                  <table className='table table-bordered table-hover'>
                    <thead>
                      <tr>
                        <th scope='col'>S/NO</th>
                        <th scope='col'>NAME</th>
                        <th scope='col'>REPORTS</th>

                        {/* <th scope='col'>CONTACT</th> */}

                        <th scope='col'>RISK</th>
                        <th scope='col'>DATE</th>
                        <th scope='col'>STATUS</th>
                      </tr>
                    </thead>
                    {ireport.map((item, index) => {
                      return (
                        <tbody>
                          <tr
                            key={index.id}
                            style={{
                              backgroundColor: viewedReports.includes(item._id)
                                ? '#ddddd'
                                : '#d5e2ee',
                            }}
                          >
                            <td>{index + 1}</td>
                            <td>{item.user_id?.firstname}</td>
                            <td>{item.description}</td>

                            {/* <td>{item.contact}</td> */}

                            <td>{item.risk}</td>
                            <td>{item.date}</td>
                            <td>
                              <Link
                                to={`/ReportDetails/${item._id}`}
                                onClick={() => markReportAsViewed(item._id)}
                              >
                                <button
                                  className='views'
                                  style={{
                                    border: 'none',
                                    background: 'transparent',
                                    color: 'blue',
                                    fontWeight: '700',
                                  }}
                                  // disabled={item.read}
                                >
                                  {viewedReports.includes(item._id)
                                    ? 'VIEWED'
                                    : 'VIEW'}
                                </button>
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
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

export default PendingiReports;
