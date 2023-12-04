import React, { useState, useEffect, useContext } from 'react';
import Compo from '../Compo';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';

function AddPayments() {
  const [payments, setPayments] = useState([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [payment_date, setPaymentDate] = useState('');
  const [service_type, setServiceType] = useState('');
  const [period_from, setPeriodFrom] = useState('');
  const [to, setTo] = useState('');
  const [due_date, setDueDate] = useState('');
  const [edit, setEdit] = useState(false);
  const [detail, setDetail] = useState([]);
  const [viewedPayment, setViewedPayment] = useState([]);

  let is__isAdmin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isAdmin = is__isAdmin === 'ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;


  
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const user_id = localStorage.getItem('user_id');
        const response = await axios.get('http://localhost:5000/payments/all', {
          params: {
            user_id,
          },
        });
        // console.log('Response:', response);
        setPayments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayments();
  },[]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleDatechange = (event) => {
    setDueDate(event.target.value);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handlePeriodChange = (event) => {
    setPeriodFrom(event.target.value);
  };

  const handleServiceChange = (event) => {
    setServiceType(event.target.value);
  };

  const handlePayChange = (event) => {
    setPaymentDate(event.target.value);
  };

  const handleNameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastChange = (event) => {
    setLastname(event.target.value);
  };

  function handleEdit(index) {
    let paymentDetail = payments[index];
    setDetail(paymentDetail);
    // setId(payment._id);
    setFirstname(paymentDetail.firstname);
    setDueDate(paymentDetail.due_date);
    setPaymentDate(paymentDetail.payment_date);
    setTo(paymentDetail.to);
    setPeriodFrom(paymentDetail.period_from);
    setServiceType(paymentDetail.service_type);
    setEdit(true);
  }

  function handleUpdate(paymentId, data) {
    let url = `http://localhost:5000/payments/${paymentId}`;
    axios
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        setEdit(false);
        // fetchPayments();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function handleDelete(index) {
    let paymentDetail = payments[index];
    let url = `http://localhost:5000/payments/${paymentDetail._id}`;
    console.log(paymentDetail._id);
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    }).then((data) => {
      // fetchPayments();
      console.log(data);
    });
  }

  function handleViewProfile(paymentsId) {
    const payment = payments.find((item) => item._id === paymentsId);
    setViewedPayment(payment);
  }

  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div className='add-payments d-flex'>
          <div className='users'>
            <Compo />
          </div>

          <div className='users_'>
            <Navigation />
            <div
              className='add_pay mt-4'
              style={{ width: '97%', margin: 'auto' }}
            >
              <h5>VIEW/ADD PAYMENTS</h5>
              <br />
              <div className='resident-txt-field'>
                <div className='txt--inside d-flex justify-content-between'>
                  <div className='cisearch-icon d-flex gap-1'>
                    <div className='search--icon p-1'>
                      <HiOutlineSearch />
                    </div>
                    <h4>Viewing Payments Information for:</h4>
                  </div>
                  <div>
                    <button className='dropdown-btn'>
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
                    <input type='text' placeholder='Enter Name' />
                  </div>
                  <div className='input-field'>
                    <input type='text' placeholder='Enter Email' />
                  </div>
                  <div>
                    <button className='all__residents-btn'>VIEW PROFILE</button>
                  </div>
                </div>
                <div className='all_residents--inputfield'>
                  <div className='media_input d-flex gap-4'>
                    <div className='input-field'>
                      <input
                        type='text'
                        placeholder='Enter identification code'
                      />
                    </div>
                    <div className='input-field'>
                      <input type='text' placeholder='Enter Name' />
                    </div>
                  </div>
                  <br />
                  <div className='media_2 d-flex gap-4'>
                    <div className='input-field'>
                      <input type='text' placeholder='Enter Email' />
                    </div>
                    <div>
                      <button className='all__residents-btn'>
                        VIEW PROFILE
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div
                  className='edit_section'
                  style={{ width: '70%', margin: 'auto' }}
                >
                  {edit && (
                    <Form className='set_edit'>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type='text'
                          name='firstname'
                          value={firstname}
                          placeholder='name'
                          onChange={handleNameChange}
                        />
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type='text'
                          name='lastname'
                          value={lastname}
                          placeholder='name'
                          onChange={handleLastChange}
                        />
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Payment_Date</Form.Label>
                        <Form.Control
                          type='text'
                          name='payment_date'
                          value={payment_date}
                          placeholder='payment_date'
                          onChange={handlePayChange}
                        />
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Service_Type</Form.Label>
                        <Form.Control
                          type='text'
                          name='service_type'
                          value={service_type}
                          placeholder='Service_type'
                          onChange={handleServiceChange}
                        />
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Period_From</Form.Label>
                        <Form.Control
                          type='text'
                          name='period_from'
                          value={period_from}
                          placeholder='Period_from'
                          onChange={handlePeriodChange}
                        />
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>To</Form.Label>
                        <Form.Control
                          type='text'
                          name='to'
                          value={to}
                          placeholder='To'
                          onChange={handleToChange}
                        />
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Due_Date</Form.Label>
                        <Form.Control
                          type='text'
                          name='due_date'
                          value={due_date}
                          placeholder='phone number'
                          onChange={handleDatechange}
                        />
                      </Form.Group>

                      <Button
                        onClick={() => handleUpdate()}
                        variant='primary'
                        type='submit'
                      >
                        Update
                      </Button>
                    </Form>
                  )}
                </div>
                <br />
                <div className='pay-hisotry d-flex      justify-content-between'>
                  <div>
                    <h5>PAYMENT HISTORY</h5>
                  </div>
                  <div>
                    <button
                      type='button'
                      className='btn'
                      style={{ backgroundColor: '#0099cc', color: 'white' }}
                      data-bs-toggle='modal'
                      data-bs-target='#exampleModal'
                    >
                      ADD PAYMENT
                    </button>

                    <div
                      className='modal fade'
                      id='exampleModal'
                      tabindex='-1'
                      aria-labelledby='exampleModalLabel'
                      aria-hidden='true'
                    >
                      <div className='modal-dialog'>
                        <div class='modal-content'>
                          <div class='modal-header'>
                            <h1 class='modal-title fs-5' id='exampleModalLabel'>
                              ADD PAYMENTS
                            </h1>
                            <button
                              type='button'
                              className='btn-close'
                              data-bs-dismiss='modal'
                              aria-label='Close'
                            ></button>
                          </div>
                          <div className='modal-body'>
                            <Form className='modal_form'>
                              <Form.Group
                                className='mb-3'
                                controlId='formBasicEmail'
                              >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                  type='text'
                                  onKeyPress={handleKeyPress}
                                  name='firstname'
                                  value={firstname}
                                  placeholder='First_name'
                                  onChange={handleNameChange}
                                  autoComplete='off'
                                />
                              </Form.Group>
                              <Form.Group
                                className='mb-3'
                                controlId='formBasicEmail'
                              >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                  type='text'
                                  onKeyPress={handleKeyPress}
                                  name='lastname'
                                  value={firstname}
                                  placeholder='Last_name'
                                  onChange={handleNameChange}
                                  autoComplete='off'
                                />
                              </Form.Group>
                              <Form.Group
                                className='mb-3'
                                controlId='formBasicEmail'
                              >
                                <Form.Label>Payment Date</Form.Label>
                                <Form.Control
                                  type='text'
                                  name='payment_date'
                                  onKeyPress={handleKeyPress}
                                  value={payment_date}
                                  placeholder='payment_date'
                                  onChange={handlePayChange}
                                />
                              </Form.Group>
                              <Form.Group
                                className='mb-3'
                                controlId='formBasicEmail'
                              >
                                <Form.Label>Service Type</Form.Label>
                                <Form.Control
                                  type='text'
                                  name='service_type'
                                  onKeyPress={handleKeyPress}
                                  value={service_type}
                                  placeholder='service_type'
                                  onChange={handleServiceChange}
                                />
                              </Form.Group>
                              <Form.Group
                                className='mb-3'
                                controlId='formBasicEmail'
                              >
                                <Form.Label>Period From</Form.Label>
                                <Form.Control
                                  type='text'
                                  name='period_from'
                                  onKeyPress={handleKeyPress}
                                  value={period_from}
                                  placeholder='period_from'
                                  onChange={handlePeriodChange}
                                />
                              </Form.Group>
                              <Form.Group
                                className='mb-3'
                                controlId='formBasicEmail'
                              >
                                <Form.Label>To</Form.Label>
                                <Form.Control
                                  type='text'
                                  name='to'
                                  onKeyPress={handleKeyPress}
                                  value={to}
                                  placeholder='to'
                                  onChange={handleToChange}
                                />
                              </Form.Group>
                              <Form.Group
                                className='mb-3'
                                controlId='formBasicEmail'
                              >
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control
                                  type='text'
                                  onKeyPress={handleKeyPress}
                                  name='due_date'
                                  value={due_date}
                                  placeholder='due_date'
                                  onChange={handleDatechange}
                                />
                              </Form.Group>
                            </Form>
                            <Button variant='primary' type='button'>
                              MAKE PAYMENT
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className='table__records'>
                  <table className='table table-bordered table-hover'>
                    <thead>
                      <tr>
                        <th scope='col'>S/NO</th>
                        <th scope='col'>FIRST NAME</th>
                        <th scope='col'>LAST NAME</th>
                        {/* <th scope='col'>ID CODE</th> */}
                        <th scope='col'>SERVICE TYPE</th>
                        <th scope='col'>LAST PAYMENT</th>

                        <th scope='col'>DUE DATE</th>
                        <th scope='col'>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((item, index) => {
                        return (
                          <tr key={index.id}>
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
                                  class='dropdown-btn btn-sm'
                                  type='button'
                                  data-bs-toggle='dropdown'
                                  aria-expanded='false'
                                >
                                  <FontAwesomeIcon
                                    icon={faEllipsisVertical}
                                    style={{ width: '100%' }}
                                  ></FontAwesomeIcon>
                                </button>
                                <ul class='dropdown-menu'>
                                  <div
                                    className='drop__down'
                                    style={{ width: '90%', margin: 'auto' }}
                                  >
                                    <div className='dropdown__details d-flex justify-content-between'>
                                      <div>
                                        <FontAwesomeIcon icon={faExpand} />
                                      </div>
                                      <td>
                                        <Link
                                          className='li_nk'
                                          style={{
                                            textDecoration: 'none',
                                            fontWeight: '700',
                                            color: '#0099cc',
                                          }}
                                          to={`/Payments/${item._id}`}
                                          onClick={() =>
                                            handleViewProfile(item._id)
                                          }
                                        >
                                          VIEW
                                        </Link>
                                      </td>
                                    </div>
                                    <br />
                                    <div className='dropdown__details d-flex justify-content-between'>
                                      <div>
                                        <FontAwesomeIcon
                                          icon={faPenToSquare}
                                        ></FontAwesomeIcon>
                                      </div>
                                      <button
                                        onClick={() => handleEdit(index)}
                                        className='dropdown___button_'
                                        style={{
                                          border: 'none',
                                          background: 'transparent',
                                          fontWeight: '700',
                                          color: '#0099cc',
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
                                        onClick={() => handleDelete(index)}
                                        className='dropdown___button_'
                                        style={{
                                          border: 'none',
                                          background: 'transparent',
                                          fontWeight: '700',
                                          color: '#0099cc',
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
                        );
                      })}
                    </tbody>
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

export default AddPayments;
