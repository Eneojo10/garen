import React, { useState, useEffect, useContext } from 'react';
import Compo from '../Compo';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoMdArrowDropdown } from 'react-icons/io';
import Navigation from '../Navigation';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ReportContext } from './ReportContext';
import { AuthContext } from '../Login/AuthContext';

function ViewReports() {
  const [ireports, setIreports] = useState([]);
  const [originalIreports, setOriginalIreports] = useState([]);
  const [filterIdentificationCode, setFilterIdentificationCode] = useState('');
  const [filterRisk, setFilterRisk] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filteredIreports, setFilteredIreports] = useState([]);
  const { viewedReports, markReportAsViewed } = useContext(ReportContext);

  // const { isLoggedIn, isAdmin } = useContext(AuthContext);
  let is__isAdmin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isAdmin = is__isAdmin === 'ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;

  

  useEffect(() => {
    const storedViewedReports =
      JSON.parse(localStorage.getItem('viewedReports')) || [];
    markReportAsViewed(storedViewedReports);
  });

  const handleViewIreport = (ireportId) => {
    const updatedIreports = ireports.map((item) => {
      if (item._id === ireportId) {
        return {
          ...item,
          read: true,
        };
      }
      return item;
    });

    setIreports(updatedIreports);
    updateLocalStorage(updatedIreports);
    markReportAsViewed(ireportId);

    localStorage.setItem('viewedReports', JSON.stringify(viewedReports));
  };

  const updateLocalStorage = (ireportsData) => {
    const readStatus = ireportsData.reduce((status, ireport) => {
      status[ireport._id] = ireport.read;
      return status;
    }, {});

    localStorage.setItem('ireportsReadStatus', JSON.stringify(readStatus));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ireports');
        const storedReadStatus =
          JSON.parse(localStorage.getItem('ireportsReadStatus')) || {};
        const updatedIreports = response.data.map((ireport) => ({
          ...ireport,
          read: storedReadStatus[ireport._id] || false,
        }));

        setIreports(updatedIreports);
        setOriginalIreports(updatedIreports);
        updateLocalStorage(updatedIreports);
      } catch (error) {
        console.error('Error fetching ireports:', error);
      }
    };

    fetchData();
  },[]);

  const handleFilter = () => {
    console.log('ireports', ireports);
    console.log('originalIreports', originalIreports);
    console.log('filterIdentificationCode', filterIdentificationCode);
    console.log('filterRisk', filterRisk);
    console.log('filterDate', filterDate);

    const filteredData = originalIreports.filter((ireport) => {
      console.log('ireport', ireport);

      const identificationCodeMatch =
        (ireport.identificationCode &&
          ireport.identificationCode
            .toLowerCase()
            .includes(filterIdentificationCode?.toLowerCase() ?? '')) ||
        filterIdentificationCode === '';

      const riskMatch =
        (ireport.risk &&
          ireport.risk
            .toLowerCase()
            .includes(filterRisk?.toLowerCase() ?? '')) ||
        filterRisk === '';

      const dateMatch =
        !ireport.date ||
        (ireport.date &&
          ireport.date
            .toLowerCase()
            .includes(filterDate?.toLowerCase() ?? '')) ||
        filterDate === '';

      return identificationCodeMatch && riskMatch && dateMatch;
    });

    console.log('filteredData', filteredData);

    setFilteredIreports(filteredData);
  };

  useEffect(() => {
    setFilteredIreports(ireports);
  });

  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div className='view-all-reports d-flex'>
          <div className='users'>
            <Compo />
          </div>
          <div className='users_'>
            <Navigation />
            <br />
            <div
              className='viewreports_'
              style={{ width: '95%', margin: 'auto' }}
            >
              <h5>VIEW ALL REPORTS</h5>
              <br />

              <div className='resident-txt-field'>
                <div className='txt--inside d-flex justify-content-between'>
                  <div className='cisearch-icon d-flex gap-1'>
                    <div className='search--icon p-1'>
                      <HiOutlineSearch />
                    </div>
                    <h4>Filter All iReports List</h4>
                  </div>
                  <div className='btn-group'>
                    <button
                      className='dropdown-btn btn-sm'
                      type='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <IoMdArrowDropdown />
                    </button>
                  </div>
                </div>
                <div className='all-residents_'>
                  <div className='all_residents-inputfield'>
                    <div className='input-field'>
                      <input
                        type='text'
                        placeholder='Identification code'
                        value={filterIdentificationCode}
                        onChange={(e) =>
                          setFilterIdentificationCode(e.target.value)
                        }
                      />
                    </div>
                    <div className='input-field'>
                      <input
                        type='text'
                        placeholder='Filter Risk'
                        value={filterRisk}
                        onChange={(e) => setFilterRisk(e.target.value)}
                      />
                    </div>
                    <div className='input-field'>
                      <input
                        type='text'
                        placeholder='Filter by Date'
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                        className='all__residents-btn'
                        onClick={handleFilter}
                      >
                        FILTER LIST
                      </button>
                    </div>
                  </div>
                  <div className='all_residents--inputfield'>
                    <div className='media_input d-flex gap-4'>
                      <div className='input-field'>
                        <input
                          type='text'
                          placeholder='Identification code'
                          value={filterIdentificationCode}
                          onChange={(e) =>
                            setFilterIdentificationCode(e.target.value)
                          }
                        />
                      </div>
                      <div className='input-field'>
                        <input
                          type='text'
                          placeholder='Filter Risk'
                          value={filterRisk}
                          onChange={(e) => setFilterRisk(e.target.value)}
                        />
                      </div>
                    </div>
                    <br />
                    <div className='media_input d-flex gap-4'>
                      <div className='input-field'>
                        <input
                          type='text'
                          placeholder='Filter by Date'
                          value={filterDate}
                          onChange={(e) => setFilterDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <button
                          className='all__residents-btn'
                          onClick={handleFilter}
                        >
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
                          <th scope='col'>REPORT</th>
                          {/* <th scope='col'>ADDRESS</th>
                          <th scope='col'>CONTACT</th> */}
                          <th scope='col'>RISK</th>
                          <th scope='col'>DATE</th>
                          <th scope='col'>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredIreports.map((item, index) => (
                          <tr
                            key={item._id}
                            style={{
                              backgroundColor: viewedReports.includes(item._id)
                                ? '#cccccc'
                                : '#d5e2ee',
                            }}
                          >
                            <td>{index + 1}</td>
                            <td>{item.user_id?.firstname}</td>
                            <td>{item.description}</td>
                            {/* <td>{item.address}</td>
                            <td>{item.contact}</td> */}
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
                                >
                                  {viewedReports.includes(item._id)
                                    ? 'VIEWED'
                                    : 'VIEW'}
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default ViewReports;
