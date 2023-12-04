import React, { useState, useEffect, useContext } from 'react';
import Compo from '../Compo';
import Navigation from '../Navigation';
import LineChart from '../LineChart';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';

function PaymentCompliance() {
  const [paymentData, setPaymentData] = useState([]);
  const [active_resident, setActive_resident] = useState(0);
  const [registerCount, setRegisterCount] = useState(0);

  let is__isAdmin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isAdmin = is__isAdmin === 'ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;


  

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/payments');
        console.log(response.data);
        setPaymentData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayments();
  },[]);

  useEffect(() => {
    const fetchActivePaymentsCounts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/payments/active-count'
        );
        setActive_resident(response.data.active_resident);
      } catch (error) {
        console.error('Error fetching active payments count:', error);
      }
    };
    
    fetchActivePaymentsCounts();
  },[]);

  useEffect(() => {
    const fetchResidentCount = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/register/total'
        );

        const count = response.data;

        setRegisterCount(count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResidentCount();
  },[]);

  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div className='compliance d-flex'>
          <div className='users'>
            <Compo />
          </div>
          <div className='users_'>
            <Navigation />
            <div
              className='compliance-details mt-4'
              style={{ width: '95%', margin: 'auto' }}
            >
              <h4>VIEW PAYMENT COMPLIANCE</h4>
              <br />
              <div className='compliance-cards d-flex justify-content-between'>
                <div
                  className='com-card-one text-white p-2'
                  style={{ fontWeight: '700' }}
                >
                  <h5>Total Active Residents</h5>
                  <p>{active_resident}</p>
                </div>
                <div
                  className='com-card-two p-2 text-white'
                  style={{ fontWeight: '700' }}
                >
                  <h5>
                    Total Up-To-Date
                    <br /> Residents
                  </h5>
                  <p>{registerCount}</p>
                </div>
                <div
                  className='com-card-three p-2 text-white'
                  style={{ fontWeight: '800' }}
                >
                  <h5>Total Residents with Outstanding Dues</h5>
                  <p>800</p>
                </div>
              </div>
              <br />
              <br />
              <div className='barchart_'>
                <LineChart paymentData={paymentData} />
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

export default PaymentCompliance;
