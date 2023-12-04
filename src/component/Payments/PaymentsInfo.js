import React, { useState, useEffect, useContext } from 'react';
import Compo from '../Compo';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import Navigation from '../Navigation';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';

function PaymentsInfo() {
  const [payments, setPayments] = useState([]);
  const [sortColumn, setSortColumn] = useState('fullname');
  const [sortOrder, setSortOder] = useState('asc');

  const [identificationCodeFilter, setIdentificationCodeFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState('');
  const [paymentDateFromFilter, setPaymentDateFromFilter] = useState('');
  const [paymentDateToFilter, setPaymentDateToFilter] = useState('');

  let is__isAdmin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isAdmin = is__isAdmin === 'ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;


  useEffect(() => {
    fetchPayments();
  });

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/payments/all');
      setPayments(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOder('asc');
    }
  };

  const sortAndFilterPayments = () => {
    if (!payments) {
      return [];
    }

    const filteredPayments = payments.filter((item) => {
      return (
        (!identificationCodeFilter ||
          item.idCode?.includes(identificationCodeFilter)) &&
        (!nameFilter || item.fullname?.includes(nameFilter)) &&
        (!emailFilter || item.email?.includes(emailFilter)) &&
        (item.due_date === dueDateFilter || !dueDateFilter) &&
        (item.payment_date >= paymentDateFromFilter ||
          !paymentDateFromFilter) &&
        (item.payment_date <= paymentDateToFilter || !paymentDateToFilter)
      );
    });

    const sortedFilteredPayments = filteredPayments.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedFilteredPayments;
  };

  const sortedAndFilteredPayments = sortAndFilterPayments();

  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div className='d-flex'>
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
              <h5>PAYMENTS INFORMATION</h5>
              <br />
              <div className='resident-txt-field'>
                <div className='txt--inside d-flex justify-content-between'>
                  <div className='cisearch-icon d-flex gap-1'>
                    <div className='search--icon p-1'>
                      <HiOutlineSearch />
                    </div>
                    <h4>Filter Payment Information</h4>
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
              </div>
              <div className='all-residents__'>
                <div
                  className='user-input-field'
                  style={{ width: '95%', margin: 'auto' }}
                >
                  <div
                    className='top-input d-flex gap-3'
                    style={{ paddingTop: '25px' }}
                  >
                    <div className='in-put-one'>
                      <input
                        type='text'
                        placeholder='Enter Identification Code'
                        value={identificationCodeFilter}
                        onChange={(e) =>
                          setIdentificationCodeFilter(e.target.value)
                        }
                      />
                    </div>
                    <div className='in-put-one'>
                      <input
                        type='text'
                        placeholder='Enter Name'
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                      />
                    </div>
                    <div className='in-put-one'>
                      <input
                        type='text'
                        placeholder='Enter Email'
                        value={emailFilter}
                        onChange={(e) => setEmailFilter(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <div className='top-input d-flex gap-3'>
                    <div className='in-put-one'>
                      <input
                        type='text'
                        placeholder='Due Date'
                        value={dueDateFilter}
                        onChange={(e) => setDueDateFilter(e.target.value)}
                      />
                    </div>
                    <div className='in-put-one'>
                      <input
                        type='text'
                        placeholder='Payment Date From'
                        value={paymentDateFromFilter}
                        onChange={(e) =>
                          setPaymentDateFromFilter(e.target.value)
                        }
                      />
                    </div>
                    <div className='in-put-one'>
                      <input
                        type='text'
                        placeholder='Payment Date To'
                        value={paymentDateToFilter}
                        onChange={(e) => setPaymentDateToFilter(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                        className='users-btn'
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: 'green',
                          padding: '5px 25px',
                          color: 'white',
                          fontWeight: '600',
                        }}
                        onClick={() => handleSort('fullname')}
                      >
                        SORT
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className='user-input-fieldd'
                  style={{ width: '95%', margin: 'auto' }}
                >
                  <div
                    className='top-input d-flex gap-3'
                    style={{ paddingTop: '25px' }}
                  >
                    <div className='in-put-one'>
                      <input
                        type='text'
                        placeholder='Enter Code'
                        value={identificationCodeFilter}
                        onChange={(e) =>
                          setIdentificationCodeFilter(e.target.value)
                        }
                      />
                    </div>
                    <div className='in-put-one'>
                      <input
                        type='text'
                        placeholder='Enter Name'
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <div className='top-input d-flex gap-3'>
                    <div className='in-put-one'>
                      <input
                        type='text'
                        placeholder='Enter Email'
                        value={emailFilter}
                        onChange={(e) => setEmailFilter(e.target.value)}
                      />
                    </div>
                    <div className='in-put-one'>
                      <input
                        type='text'
                        placeholder='Due Date'
                        value={dueDateFilter}
                        onChange={(e) => setDueDateFilter(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <div className='top-input d-flex gap-3'>
                    <div className='in-put-one'>
                      <input
                        type='text'
                        placeholder='Payment Date From'
                        value={paymentDateFromFilter}
                        onChange={(e) =>
                          setPaymentDateFromFilter(e.target.value)
                        }
                      />
                    </div>
                    <div className='in-put-one'>
                      <input
                        type='text'
                        placeholder='Payment Date To'
                        value={paymentDateToFilter}
                        onChange={(e) => setPaymentDateToFilter(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <div>
                    <button
                      className='users-btn'
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: 'green',
                        padding: '5px 25px',
                        color: 'white',
                        fontWeight: '600',
                      }}
                      onClick={() => handleSort('fullname')}
                    >
                      SORT
                    </button>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <div className='table__records'>
                <table className='table table-bordered table-hover'>
                  <thead>
                    <tr>
                      <th scope='col'>S/NO</th>
                      <th scope='col'>FIRST NAME</th>
                      <th scope='col'>LAST NAME</th>
                      <th scope='col'>SERVICE TYPE</th>
                      <th scope='col'>LAST PAYMENT</th>
                      <th scope='col'>DUE DATE</th>
                      <th scope='col'>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAndFilteredPayments.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.service_type}</td>
                        <td>{item.to}</td>
                        <td>{item.due_date}</td>
                        <td>
                          <div
                            className='btn-group'
                            style={{ marginLeft: '30px' }}
                          >
                            <button
                              className='dropdown-btn btn-sm'
                              type='button'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'
                            >
                              <FontAwesomeIcon
                                icon={faEllipsisVertical}
                                style={{ width: '100%' }}
                              ></FontAwesomeIcon>
                            </button>
                            <ul className='dropdown-menu'>
                              <div
                                className='drop__down'
                                style={{ width: '90%', margin: 'auto' }}
                              >
                                <div className='dropdown__details d-flex justify-content-between'>
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faExpand}
                                    ></FontAwesomeIcon>
                                  </div>
                                  <button
                                    className='dropdown___button_'
                                    style={{
                                      border: 'none',
                                      background: 'transparent',
                                      fontWeight: '700',
                                      color: 'blue',
                                    }}
                                  >
                                    VIEW
                                  </button>
                                </div>
                                <br />
                                <div className='dropdown__details d-flex justify-content-between'>
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faPenToSquare}
                                    ></FontAwesomeIcon>
                                  </div>
                                  <button
                                    className='dropdown___button_'
                                    style={{
                                      border: 'none',
                                      background: 'transparent',
                                      fontWeight: '700',
                                      color: 'blue',
                                    }}
                                  >
                                    EDIT
                                  </button>
                                </div>
                                <br />
                                <div className='dropdown__details d-flex justify-content-between'>
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                    ></FontAwesomeIcon>
                                  </div>
                                  <button
                                    className='dropdown___button_'
                                    style={{
                                      border: 'none',
                                      background: 'transparent',
                                      fontWeight: '700',
                                      color: 'blue',
                                    }}
                                  >
                                    DELETE
                                  </button>
                                </div>
                              </div>
                            </ul>
                          </div>
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

export default PaymentsInfo;
