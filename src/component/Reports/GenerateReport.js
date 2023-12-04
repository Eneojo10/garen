import React, { useState, useEffect } from 'react';
import Compo from '../Compo';
import Navigation from '../Navigation';
import { HiOutlineSearch } from 'react-icons/hi';
import axios from 'axios';

function GenerateReport() {
  const [identificationCode, setIdentificationCode] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [firstname, setFirstname] = useState('');
  const [house_number, setHouseNumber] = useState('');
  const [homes, setHomes] = useState(null);
  const [home_status, setHomeStatus] = useState([]);
  const [residence_id, setResidence] = useState('');

  

  const handleFilter = async () => {
    console.log('handleFilter function called');
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identificationCode,
          surname,
          email,
          phone,
          street,
          searchDate,
          firstname,
          house_number,
          homes,
        }),
      });
      // console.log('Filter Button Clicked');
      // console.log('surname:', surname);
      // console.log(response)

      if (!response.ok) {
        throw new Error('Failed to fetch data from the server');
      }

      const filteredData = await response.json();
      console.log(filteredData);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleHomeStatusChange = (event) => {
    setResidence(event.target.value);
  };

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/residence');
        setHomeStatus(response.data);

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHomeData();
  },[]);

  
  return (
    <div>
      <div className='generate_report d-flex'>
        <div className='users'>
          <Compo />
        </div>
        <div className='users_'>
          <Navigation />
          <br />
          <div
            className='generate_report'
            style={{ width: '97%', margin: 'auto' }}
          >
            <h5>GENERATE REPORTS</h5>
            <br />
            <div className='resident-txt-field'>
              <div className='txt--inside d-flex justify-content-between'>
                <div className='cisearch-icon d-flex gap-1'>
                  <div className='search--icon p-1'>
                    <HiOutlineSearch />
                  </div>
                  <h4>New Residents Form</h4>
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
                <form
                  className='form_details d-flex'
                  style={{
                    width: '91%',
                    margin: 'auto',
                    paddingTop: '45px',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    className='generate_input_field'
                    style={{ width: '27%' }}
                  >
                    <div>
                      <input
                        type='text'
                        placeholder='Enter identification code'
                        value={identificationCode}
                        onChange={(e) => setIdentificationCode(e.target.value)}
                      />
                    </div>
                    <br />
                    <div>
                      <input
                        type='text'
                        placeholder='Enter your surname'
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                      />
                    </div>
                    <br />
                    <div>
                      <input
                        type='text'
                        placeholder='Enter a Functional Email Please'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <br />
                    <div>
                      <input
                        type='text'
                        placeholder='Enter Phone Number'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <br />
                    <div>
                      <input
                        type='text'
                        placeholder='Enter House Number'
                        value={house_number}
                        onChange={(e) => setHouseNumber(e.target.value)}
                      />
                    </div>
                    <br />
                    <div className='generate_buttons d-flex gap-1'>
                      <div>
                        <button
                          className='generate_button'
                          type='submit'
                          style={{
                            border: 'none',
                            background: 'none',
                            backgroundColor: '#669906',
                            color: 'white',
                            padding: '5px 25px',
                          }}
                          onClick={handleFilter}
                        >
                          Filter
                        </button>
                      </div>
                      <div>
                        <button
                          className='generate_button'
                          style={{
                            border: 'none',
                            background: 'none',
                            backgroundColor: '#669906',
                            color: 'white',
                            padding: '5px 35px',
                          }}
                          onClick={() => {
                            setIdentificationCode('');
                            setSurname('');
                            setEmail('');
                            setPhone('');
                            setHouseNumber('');
                            setFirstname('');
                            setSearchDate('');
                            setHomes('');
                            setStreet('');
                          }}
                        >
                          Clear Fields
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className='generate_input_field'
                    style={{ paddingTop: '60px', width: '30%' }}
                  >
                    <div>
                      <input
                        type='text'
                        placeholder='Enter Your First Name'
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </div>
                    <br />
                    <div>
                      <input
                        type='text'
                        placeholder='Search By Date'
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                      />
                    </div>
                    <br />
                    <div className='generate_select'>
                      <select
                        name='residence_id'
                        value={residence_id}
                        onChange={handleHomeStatusChange}
                      >
                        <option>Select Home Status</option>
                        {home_status &&
                          home_status.map((e) => (
                            <option key={e._id} value={e._id}>
                              {e.category}
                            </option>
                          ))}
                      </select>
                    </div>
                    <br />
                    <div>
                      <input
                        type='text'
                        placeholder='Enter Street'
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>
                  </div>
                  <div
                    className='generate_input_field'
                    style={{ marginTop: '60px', width: '30%' }}
                  >
                    <div>
                      <input type='text' />
                    </div>
                    <br />
                    <div>
                      <input type='text' />
                    </div>
                    <br />
                    <div>
                      <input type='text' />
                    </div>
                    <br />
                    <div>
                      <input type='text' />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateReport;
