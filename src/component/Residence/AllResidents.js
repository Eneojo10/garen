import React, { useState, useEffect, useMemo, useContext } from 'react';
import Compo from '../Compo';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import SingleResidentProfile from './SingleResidentProfile';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function AllResidents() {
  const [edit, setEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [residence, setResidence] = useState([]);
  const [status, setStatus] = useState([]);
  const [record, setRecord] = useState([]);
  const [payment, setPayment] = useState([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service_type, setServiceType] = useState('');
  const [to, setTo] = useState('');
  const [period_from, setPeriodFrom] = useState('');
  const [amount, setAmount] = useState('');
  const [payment_date, setPaymentDate] = useState('');
  const [due_date, setDueDate] = useState('');
  const [id, setId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [combinedData, setCombinedData] = useState([]);
  const [identificationCode, setIdentificationCode] = useState('');
  const [filterIdentificationCode, setFilterIdentificationCode] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedUserPayments, setSelectedUserPayments] = useState([]);

  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState({
    firstname: '',
    lastname: '',
    address: '',
    email: '',
    phone: '',
  });

  let is__isAdmin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isAdmin = is__isAdmin === 'ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;

  const handlePayment = () => {
    const Residencepayments = {
      firstname: selectedPaymentDetails.firstname,
      lastname: selectedPaymentDetails.lastname,
      address,
      email,
      phone,
      amount,
      payment_date,
      service_type,
      period_from,
      to,
      due_date,
    };

    const paymentEndpoint = 'http://localhost:5000/payments';

    axios
      .post(paymentEndpoint, Residencepayments)
      .then((response) => {
        const newPayment = response.data;

        setDueDate('');
        setServiceType('');
        setPaymentDate('');
        setPeriodFrom('');
        setTo('');
        setAmount('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleFilter = () => {
    const filteredData = combinedData.filter((item) => {
      const identificationCodeMatch =
        item.identificationCode === filterIdentificationCode ||
        filterIdentificationCode === '';

      const nameMatch =
        item.firstname.toLowerCase().includes(filterName.toLowerCase()) ||
        item.lastname.toLowerCase().includes(filterName.toLowerCase()) ||
        filterName === '';

      const emailMatch =
        item.email.toLowerCase().includes(filterEmail.toLowerCase()) ||
        filterEmail === '';

      return identificationCodeMatch && nameMatch && emailMatch;
    });

    setCombinedData(filteredData);
    

    setFilterEmail('');
    setFilterIdentificationCode('');
    setFilterName('');
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = localStorage.getItem('user_id');
        const storedData = localStorage.getItem('combinedData');
        if (storedData) {
          setCombinedData(JSON.parse(storedData));
        } else {
          const responseUsers = await axios.get('http://localhost:5000/users', {
            params: {
              user_id,
            },
          });

          const responseResidence = await axios.get(
            'http://localhost:5000/residence'
          );
          const responseStatus = await axios.get(
            'http://localhost:5000/status'
          );

          const data = combineData(
            responseUsers.data,
            responseResidence.data,
            responseStatus.data
          );

          setCombinedData(data);
          localStorage.setItem('combinedData', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error fetching and combining data:', error);
      }
    };

    fetchData();
  }, []);


  // useEffect(() => {
  //   const fetchResidence = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/residence');
  //       setResidence(response.data);
  //     } catch (err) {
  //       console.error('Error fetching data from URL');
  //     }
  //   };

  //   fetchResidence();
  // }, []);

  // useEffect(() => {
  //   const fetchStatus = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/status');
  //       setStatus(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data');
  //     }
  //   };

  //   fetchStatus();
  // }, []);

  const combineData = useMemo(() => {
    const identificationCodes = {};

    return (usersData, residenceData, statusData) => {
      return usersData.map((itemFromUsers) => {
        const matchingItemFromResidence = residenceData.find(
          (itemFromResidence) => {
            return itemFromResidence?._id === itemFromUsers.residence_id;
          }
        );

        const matchingItemFromStatus = statusData.find((itemFromStatus) => {
          console.log(itemFromUsers);
          return itemFromStatus?._id === itemFromUsers.status_id;
        });

        const additionalFieldResidence = matchingItemFromResidence
          ? matchingItemFromResidence.category
          : '';

        const additionalFieldStatus = matchingItemFromStatus
          ? matchingItemFromStatus.resident
          : '';

        let identificationCode;
        if (itemFromUsers._id in identificationCodes) {
          identificationCode = identificationCodes[itemFromUsers?._id];
        } else {
          identificationCode =
            getStoredIdentificationCode(itemFromUsers?._id) ||
            generateIdentificationCode();

          identificationCodes[itemFromUsers?._id] = identificationCode;
          storeIdentificationCode(itemFromUsers?._id, identificationCode);
        }

        return {
          ...itemFromUsers,
          additionalFieldResidence: additionalFieldResidence,
          additionalFieldStatus: additionalFieldStatus,
          identificationCode: identificationCode,
        };
      });
    };
  }, []);

  useEffect(() => {
    if (users.length > 0 && residence.length > 0 && status.length > 0) {
      const data = combineData(users, residence, status);
      setCombinedData(data);
      console.log(data);
    }
  }, []);

  const getStoredIdentificationCode = (user_id) => {
    return localStorage.getItem(`identificationCode_${user_id}`);
  };

  const storeIdentificationCode = (user_id, code) => {
    localStorage.setItem(`identificationCode_${user_id}`, code);
  };

  const generateIdentificationCode = () => {
    const min = 1;
    const max = 999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString().padStart(3, '0');
  };

  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };
  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleServiceChange = (event) => {
    setServiceType(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handlePeriodChange = (event) => {
    setPeriodFrom(event.target.value);
  };
  const handleToChange = (event) => {
    setTo(event.target.value);
  };
  const handlePaymentChange = (event) => {
    setPaymentDate(event.target.value);
  };
  const handleDueChange = (event) => {
    setDueDate(event.target.value);
  };

  function handleEdit(index) {
    let userRecord = users[index];
    setRecord(userRecord);
    setId(userRecord._id);
    setFirstname(userRecord.firstname);
    setLastname(userRecord.lastname);
    setAddress(userRecord.address);
    setPhone(userRecord.phone);
    setEmail(userRecord.email);
    setEdit(true);
  }
  function handleDelete(index) {
    let userRecord = users[index];
    let url = `http://localhost:5000/users/${userRecord._id}`;
    // console.log(userRecord._id);

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    }).then((data) => {
      // fetchData();
      console.log(data);
    });
  }

  function updateUser() {
    const updatedUserData = {
      firstname: firstname,
    };

    const url = `http://localhost:5000/users/${id}`;

    axios
      .put(url, updatedUserData)
      .then((response) => {})
      .catch((error) => {
        console.error('Error updating user:', error);
      });

    setEdit(false);
  }

  const handleViewProfile = (user_id) => {
    const user = combinedData.find((item) => item._id === user_id);
    setSelectedUserPayments(user?.payments || []);

    setSelectedPaymentDetails({
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      address: user?.address || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });

    setShowPaymentModal(true);
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
              <h5>VIEW RESIDENTS</h5>
              <br />
              <div className='resident-txt-field'>
                <div className='txt--inside d-flex justify-content-between'>
                  <div className='cisearch-icon d-flex gap-1'>
                    <div className='search--icon p-1'>
                      <HiOutlineSearch />
                    </div>
                    <h4>Filter Residents List</h4>
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
                      value={filterIdentificationCode}
                      onChange={(e) =>
                        setFilterIdentificationCode(e.target.value)
                      }
                    />
                  </div>
                  <div className='input-field'>
                    <input
                      type='text'
                      placeholder='Enter Name'
                      value={filterName}
                      onChange={(e) => setFilterName(e.target.value)}
                    />
                  </div>
                  <div className='input-field'>
                    <input
                      type='text'
                      placeholder='Enter Email'
                      value={filterEmail}
                      onChange={(e) => setFilterEmail(e.target.value)}
                    />
                  </div>
                  <div className='filter_btn'>
                    <button
                      className='all__residents-btn'
                      onClick={handleFilter}
                    >
                      FILTER LIST
                    </button>
                  </div>
                </div>
                <div className='all_residents--inputfield'>
                  <div className='media_input'>
                    <div className='input-field'>
                      <input
                        type='text'
                        placeholder='Enter identification code'
                        value={filterIdentificationCode}
                        onChange={(e) =>
                          setFilterIdentificationCode(e.target.value)
                        }
                      />
                    </div>
                    <div className='input-field'>
                      <input
                        type='text'
                        placeholder='Enter Name'
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <div className='media_input2 d-flex gap-3'>
                    <div className='input-field'>
                      <input
                        type='text'
                        placeholder='Enter Email'
                        value={filterEmail}
                        onChange={(e) => setFilterEmail(e.target.value)}
                      />
                    </div>
                    <br />
                    <div className='filter_btn'>
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
                <div
                  className='edit_section'
                  style={{ width: '70%', margin: 'auto' }}
                >
                  {edit && (
                    <Form className='set_edit'>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>First_Name</Form.Label>
                        <Form.Control
                          type='text'
                          name='firstname'
                          value={firstname}
                          placeholder='first_name'
                          onChange={handleFirstnameChange}
                        />
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Last_Name</Form.Label>
                        <Form.Control
                          type='text'
                          name='lastName'
                          value={lastname}
                          placeholder='last_name'
                          onChange={handleLastnameChange}
                        />
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type='text'
                          name='email'
                          value={email}
                          placeholder='email'
                          onChange={handleEmailChange}
                        />
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                          type='phone'
                          name='phone'
                          value={phone}
                          placeholder='phone_No'
                          onChange={handlePhoneChange}
                        />
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type='text'
                          name='address'
                          value={address}
                          placeholder='phone_No'
                          onChange={handleAddressChange}
                        />
                      </Form.Group>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          updateUser();
                        }}
                        variant='primary'
                        type='submit'
                      >
                        update
                      </Button>
                    </Form>
                  )}
                </div>
                <br />
                <div className='table__records'>
                  <table className='table table-bordered table-hover'>
                    <thead>
                      <tr>
                        <th scope='col'>S/NO</th>
                        <th scope='col'>FIRST_NAME</th>
                        <th scope='col'>LAST_NAME</th>

                        <th scope='col'>ADDRESS</th>

                        <th scope='col'>HOME STATUS</th>
                        <th scope='col'>RESIDENT STATUS</th>

                        <th scope='col'>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {combinedData.map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.firstname}</td>
                          <td>{item.lastname}</td>

                          <td>{item.address}</td>

                          <td>{item.additionalFieldResidence}</td>
                          <td>{item.additionalFieldStatus}</td>

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
                                />
                              </button>
                              <ul className='dropdown-menu'>
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
                                        to={`/residence/${item._id}/${item.identificationCode}`}
                                        onClick={() =>
                                          handleViewProfile(item._id)
                                        }
                                      >
                                        VIEW
                                      </Link>
                                    </td>
                                  </div>
                                  <br />
                                  <div className='dropdown___details d-flex justify-content-between'>
                                    <div>
                                      <FontAwesomeIcon icon={faPenToSquare} />
                                    </div>
                                    <button
                                      className='dropdown___button_'
                                      style={{
                                        border: 'none',
                                        background: 'transparent',
                                        fontWeight: '700',
                                        color: '#0099cc',
                                      }}
                                      onClick={() => handleEdit(index)}
                                    >
                                      EDIT
                                    </button>
                                  </div>
                                  <br />
                                  <div className='dropdown___details_ d-flex justify-content-between'>
                                    <div>
                                      <FontAwesomeIcon icon={faCreditCard} />
                                    </div>
                                    <button
                                      className='dropdown___button_'
                                      style={{
                                        border: 'none',
                                        background: 'transparent',
                                        fontWeight: '700',
                                        color: '#0099cc',
                                      }}
                                      onClick={() =>
                                        handleViewProfile(item._id)
                                      }
                                    >
                                      PAYMENT
                                    </button>
                                  </div>
                                  <br />
                                  <div className='dropdown___details__ d-flex justify-content-between'>
                                    <div>
                                      <FontAwesomeIcon icon={faTrash} />
                                    </div>
                                    <button
                                      className='dropdown___button_'
                                      style={{
                                        border: 'none',
                                        background: 'transparent',
                                        fontWeight: '700',
                                        color: '#0099cc',
                                      }}
                                      onClick={() => handleDelete(index)}
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
              {selectedUserId && (
                <SingleResidentProfile
                  identificationCode={identificationCode}
                  usersId={selectedUserId}
                />
              )}

              <Modal
                show={showPaymentModal}
                onHide={() => {
                  setShowPaymentModal(false);
                  setFirstname('');
                  setLastname('');
                  setAddress('');
                  setEmail('');
                  setPhone('');
                }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Payment Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <div className='modal_form'>
                      <Form.Group controlId='firstname'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type='text'
                          name='firstname'
                          value={selectedPaymentDetails.firstname}
                          readOnly
                        />
                      </Form.Group>

                      <Form.Group controlId='lastname'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type='lastname'
                          name='lastname'
                          value={selectedPaymentDetails.lastname}
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type='text'
                          name='address'
                          value={selectedPaymentDetails.address}
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type='email'
                          name='email'
                          value={selectedPaymentDetails.email}
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group controlId='phone'>
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                          type='phone'
                          name='phone'
                          value={selectedPaymentDetails.phone}
                          readOnly
                        />
                      </Form.Group>

                      <Form.Group controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                          type='amount'
                          name='amount'
                          value={amount}
                          onChange={handleAmountChange}
                          autoComplete='off'
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId='service_type'>
                        <Form.Label>Service_Type</Form.Label>
                        <Form.Control
                          type='service_type'
                          name='service_type'
                          value={service_type}
                          onChange={handleServiceChange}
                          autoComplete='off'
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId='period_from'>
                        <Form.Label>Period_From</Form.Label>
                        <Form.Control
                          type='period_from'
                          name='period_from'
                          value={period_from}
                          onChange={handlePeriodChange}
                          autoComplete='off'
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId='to'>
                        <Form.Label>To</Form.Label>
                        <Form.Control
                          type='to'
                          name='to'
                          value={to}
                          onChange={handleToChange}
                          autoComplete='off'
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId='payment_date'>
                        <Form.Label>Payment_Date</Form.Label>
                        <Form.Control
                          type='payment_date'
                          name='payment_date'
                          value={payment_date}
                          onChange={handlePaymentChange}
                          autoComplete='off'
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId='due_date'>
                        <Form.Label>Due_Date</Form.Label>
                        <Form.Control
                          type='due_date'
                          name='due_date'
                          value={due_date}
                          onChange={handleDueChange}
                          autoComplete='off'
                        ></Form.Control>
                      </Form.Group>
                    </div>
                    <br />
                    <Button
                      onClick={() => handlePayment()}
                      variant='primary'
                      type='button'
                    >
                      MAKE PAYMENT
                    </Button>
                  </Form>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    variant='secondary'
                    onClick={() => setShowPaymentModal(false)}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      ) : (
        <>You do not have the permission to view this page</>
      )}
    </div>
  );
}

export default AllResidents;
