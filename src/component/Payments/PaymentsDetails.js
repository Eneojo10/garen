import React, { useState, useEffect, useContext } from 'react';
import Compo from '../Compo';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';

function PaymentsDetails() {
  const { paymentsId } = useParams();
  const [payments, setPayments] = useState(null);

  let is__isAdmin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isAdmin = is__isAdmin === 'ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;


  useEffect(() => {
    fetchPaymentsDetails();
  });

  const fetchPaymentsDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/payments/${paymentsId}`
      );
      
      setPayments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!payments) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div className='generate_report d-flex'>
          <div className='users'>
            <Compo />
          </div>
          <div className='users_'>
            <Navigation />
            <br />
            <div className='payment_recs'>
              <h5>Payment Records</h5>
              <br />
              <div className='resident-txt-field'>
                <div className='txt--inside d-flex justify-content-between'>
                  <div className='cisearch-icon d-flex gap-1'>
                    {/* <div className='search--icon p-1'>
                    <HiOutlineSearch />
                  </div> */}
                    <h4>Payment Records</h4>
                  </div>
                </div>
                <div
                  className='generate_border'
                  style={{
                    border: '1px solid #cccccc',
                    height: '700px',
                    borderTop: 'none',
                  }}
                >
                  <Form>
                    <div className='pay_records py-4'>
                      <Form.Group controlId='firstname'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type='text'
                          name='firstname'
                          value={payments.firstname}
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group controlId='lastname'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type='text'
                          name='lastname'
                          value={payments.lastname}
                          readOnly
                        />
                      </Form.Group>

                      <Form.Group controlId='service_type'>
                        <Form.Label>Service_Type</Form.Label>
                        <Form.Control
                          type='text'
                          name='service_type'
                          value={payments.service_type}
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                          type='text'
                          name='amount'
                          value={payments.amount}
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group controlId='period_from'>
                        <Form.Label>Period_From</Form.Label>
                        <Form.Control
                          type='text'
                          name='period_from'
                          value={payments.period_from}
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group controlId='to'>
                        <Form.Label>To</Form.Label>
                        <Form.Control
                          type='text'
                          name='to'
                          value={payments.to}
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group controlId='payment_date'>
                        <Form.Label>Payment_Date</Form.Label>
                        <Form.Control
                          type='text'
                          name='payment_date'
                          value={payments.payment_date}
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group controlId='due_date'>
                        <Form.Label>Due_Date</Form.Label>
                        <Form.Control
                          type='text'
                          name='due_date'
                          value={payments.due_date}
                          readOnly
                        />
                      </Form.Group>
                    </div>
                  </Form>
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

export default PaymentsDetails;
