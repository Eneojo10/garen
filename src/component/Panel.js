import React, { useEffect, useState, useContext } from 'react';
import { HiOutlineHome, HiOutlineDocumentReport } from 'react-icons/hi';
import { HiUsers } from 'react-icons/hi';
import { TbRadioactive } from 'react-icons/tb';
import Compo from './Compo';
import Navigation from './Navigation';
import axios from 'axios';
import LineChart from './LineChart';
import { ReportContext } from './Reports/ReportContext';
import { Link } from 'react-router-dom';
// import Footer from './Footer';


function Panel() {
  const [residenceCount, setResidenceCount] = useState(0);
  const [ireportCount, setIreportCount] = useState(0);
  const [pendingReports, setPendingReports] = useState([]);
  const [totalAdminUsers, setTotalAdminUsers] = useState(0);
  const [users, setUsers] = useState('');
  const { viewedReports, markReportAsViewed } = useContext(ReportContext);
  const [activePayments, setActivePayments] = useState(0);
  const [paymentData, setPaymentData] = useState([]);

  let is_admin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isAdmin = is_admin === 'ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;

  

  useEffect(() => {
    const fetchActivePaymentsCount = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/payments/active-count'
        );
        setActivePayments(response.data.activePayments);
      } catch (error) {
        console.error('Error fetching active payments count:', error);
      }
    };

    fetchActivePaymentsCount();
  },[]);

  useEffect(() => {
    async function fetchPaymentData() {
      try {
        const response = await axios.get('http://localhost:5000/payments');
        setPaymentData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchIreport();
    fetchResidentCount();
    fetchIreportCount();
    fetchUsers();
    fetchPaymentData();
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

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);

      const adminUsers = response.data.filter((user) => user.isAdmin);
      setTotalAdminUsers(adminUsers.length);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIreportCount = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost:5000/ireports/total/${user_id}`);

      const count = response.data.total_ireports;
      
      setIreportCount(count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchResidentCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/total');

      const count = response.data;

      setResidenceCount(count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIreport = async () => {
    try {
      const response = await axios.get('http://localhost:5000/ireports');

      // console.log('Response:', response.data);
      const storedReadStatus =
        JSON.parse(localStorage.getItem('pendingReportsReadStatus')) || {};
      const updatedPendingReports = response.data.map((ireport) => ({
        ...ireport,
        read: storedReadStatus[ireport._id] || false,
      }));

      setPendingReports(updatedPendingReports);
      updateLocalStorage(updatedPendingReports);

      const initialUnreadCount = updatedPendingReports.filter(
        (ireport) => !ireport.read
      ).length;
      setIreportCount(initialUnreadCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleViewIreport = (ireportId) => {
    const updatedPendingReports = pendingReports.map((item) => {
      if (item._id === ireportId && !item.read) {
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

    setIreportCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  // console.log(isLoggedIn, isAdmin);
  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div className='panel d-flex'>
          <div className='rr' style={{ width: '30%' }}>
            <Compo />
          </div>

          <div className='main--side'>
            <Navigation />
            <br />
            <div className='container '>
              <h5>DASHBOARD</h5>
              <br />
              <div className='media__cards'>
                <div className='row'>
                  <div className='col'>
                    <div className='cardOne d-flex '>
                      <div className='cd1'>
                        <h4>Total Registered Residents</h4>
                        <h5>{residenceCount}</h5>
                      </div>
                      <div className='card-color text-white'>
                        <span className='card-icon'>
                          <HiOutlineHome />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='cardOne d-flex'>
                      <div className='cd1'>
                        <h4>Total Submitted iReports</h4>
                        <h5>{ireportCount}</h5>
                      </div>
                      <div className='card-colorTwo text-white'>
                        <span className='card-icon'>
                          <HiOutlineDocumentReport />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='cardOne d-flex'>
                      <div className='cd1'>
                        <h4>System Administrators</h4>
                        <h5>{totalAdminUsers}</h5>
                      </div>
                      <div className='card-colorThr text-white'>
                        <span className='card-icon'>
                          <HiUsers />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='cardOne d-flex'>
                      <div className='cd1'>
                        <h4>Active Payments</h4>
                        <h5>{activePayments}</h5>
                        <div className='card-arr d-flex gap-2'></div>
                      </div>
                      <div className='card-colorFr text-white'>
                        <span className='card-icon'>
                          <TbRadioactive />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <div className='media_card'>
                <div className='media_card_section'>
                  <div className='mediaCard_sec1'>
                    <div className='media_1'>
                      <h6>Total Registered Residents</h6>
                      <h5>{residenceCount}</h5>
                    </div>
                  </div>
                  <div className='mediaCard_sec2'>
                    <div className='media_1'>
                      <h6>Total Submitted iReports</h6>
                      <h5>{ireportCount}</h5>
                    </div>
                  </div>
                </div>
                <br />
                <div className='media_card_section'>
                  <div className='mediaCard_sec3'>
                    <div className='media_1'>
                      <h6>System Administrators</h6>
                      <h5>{totalAdminUsers}</h5>
                    </div>
                  </div>
                  <div className='mediaCard_sec4'>
                    <div className='media_1'>
                      <h6>Active Payments</h6>
                      <h5>{paymentData.length}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='row_one'
                style={{ marginBottom: '150px', display: 'flex' }}
              >
                <div className='barchart'>
                  <LineChart paymentData={paymentData} />
                </div>

                <div className='col-sm-4'>
                  <div className='tabsTwo'>
                    <div className='inside_Two'>
                      <div className='x--box'>
                        <div className='x-box'></div>
                      </div>
                      <br />
                      <br />
                      <div className='x-box-cont d-flex'>
                        <strong>
                          Desktop<p className='parag'>50%</p>
                        </strong>
                        <strong>
                          Tab<p className='parags'>40%</p>
                        </strong>
                        <strong>
                          Mobile<p className='paragg'>32%</p>
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-sm-4'>
                <div className='tabsTwwo'>
                  <div className='x--box'>
                    <div className='x-box'></div>
                  </div>
                  <br />
                  <br />
                  <div className='x-box-cont d-flex'>
                    <strong>
                      Desktop<p className='parag'>50%</p>
                    </strong>
                    <strong>
                      Tab<p className='parags'>40%</p>
                    </strong>
                    <strong>
                      Mobile<p className='paragg'>32%</p>
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className='tab---les' style={{ width: '95%', margin: 'auto' }}>
              <div className='pen-ding'>
                <div className='pending__reports'>
                  <h5>Pending iReports</h5>
                </div>
                <div className='pending-box'></div>
              </div>
              <div className='table__records'>
                <table
                  className='table table-bordered table-hover '
                  style={{ backgroundColor: '#D5E2EE' }}
                >
                  <thead>
                    <tr>
                      <th scope='col'>S/NO</th>
                      <th scope='col'>NAME</th>
                      <th scope='col'>REPORT</th>
                      {/* <th scope='col'>ADDRESS</th> */}
                      {/* <th scope='col'>CONTACT</th> */}
                      <th scope='col'>RISK</th>
                      <th scope='col'>DATE</th>
                      <th scope='col'>STATUS</th>
                      {/* <th scope='col'>STATUS</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {pendingReports.map((item, index) => (
                      <tr
                        key={item._id}
                        style={{
                          backgroundColor: viewedReports.includes(item.read)
                            ? '#cccccc'
                            : '#d5e2ee',
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{item.user_id?.firstname}</td>
                        <td className='report-cell'>{item.description}</td>
                        {/* <td>{item.address}</td> */}

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
      ) : (
        <>You do not have the permission to view this page</>
      )}
    </div>
  );
}

export default Panel;
