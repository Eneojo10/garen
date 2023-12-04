import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigationz from './Navigationz';
import AdminSideBar from '../SuperAdmin/AdminSideBar';

function CreateEstate() {
  const [message, setMessage] = useState('');
  const [estateName, setEstateName] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [estates, setEstates] = useState([]);
  const [estate_id, setEstate] = useState('');
  const [selectedEstate, setSelectedEstate] = useState('');

  const handleCreateEstate = async () => {
    try {
      const user_id = localStorage.getItem('user_id');

      console.log('USER ID:', user_id);

      const response = await axios.post('http://localhost:5000/estates', {
        user_id,
        estateName,
      });
      alert('Estate Created!!!');
      console.log(response);
      setEstateName('');

      if (response.status === 201) {
        setMessage('Estate created successfully');
      }
    } catch (error) {
      setMessage('Server error:' + error.message);
    }
  };

  const handleCreateAdmin = async () => {
    try {
      const user_id = localStorage.getItem('user_id');

      const adminData = {
        fullname,
        email,
        phone,
        password,
        estate_id,
      };

      const response = await axios.post('http://localhost:5000/admin', {
        user_id,
        estate_id: selectedEstate,
        ...adminData,
      });
      alert('Admin created!!!');
      console.log(response);
      setFullname('');
      setEmail('');
      setPhone('');
      setPassword('');
      setSelectedEstate('');

      if (response.status === 201) {
        setMessage('Admin created and added to the estate successfully');
      }
    } catch (error) {
      setMessage('Server error:' + error.message);
    }
  };

  const handleEstateChange = (event) => {
    setEstate(event.target.value);
  };

  useEffect(() => {
    const fetchEstate = async () => {
      try {
        const response = await axios.get('http://localhost:5000/estates');
        setEstates(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching estates:', error);
      }
    };

    fetchEstate();
  }, []);

  

  return (
    <div>
      <div className='create_residents d-flex'>
        <div className='users'>
          <AdminSideBar />
        </div>
        <div className='super-color'>
          <Navigationz />
          <div className='super-input'>
            <div className='sub-admin-form'>
              <form>
                <div className='super--admin d-flex justify-content-between'>
                  <div>
                    <label htmlFor='estateName'>Estate Name:</label>
                  </div>
                  <div className='sub-details'>
                    <input
                      type='text'
                      placeholder='Create Estate'
                      id='estateName'
                      value={estateName}
                      onChange={(e) => setEstateName(e.target.value)}
                    />
                  </div>
                </div>
              </form>
              <br />
              <button
                onClick={handleCreateEstate}
                className='subAdmin-btn'
                type='submit'
              >
                Create Estate
              </button>
            </div>
            <br />
            <div className='sub-admin-form'>
              <form>
                <div className='super--admin d-flex justify-content-between'>
                  <div>
                    <label htmlFor='fullname'>Full Name:</label>
                  </div>
                  <div className='sub-details'>
                    <input
                      type='text'
                      id='fullname'
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                </div>
                <br />
                <div className='super--admin d-flex justify-content-between'>
                  <div>
                    <label htmlFor='email'>Email:</label>
                  </div>
                  <div className='sub-details'>
                    <input
                      type='text'
                      id='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <br />
                <div className='super--admin d-flex justify-content-between'>
                  <div>
                    <label htmlFor='selectedEstate'>Select Estate:</label>
                  </div>
                  <div className='sub-details'>
                    <select
                      id='selectedEstate'
                      value={estate_id}
                      onChange={handleEstateChange}
                    >
                      <option value=''>Select Estate</option>
                      {estates &&
                        estates.map((e) => (
                          <option key={e._id} value={e._id}>
                            {e.estateName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <br />
                <div className='super--admin d-flex justify-content-between'>
                  <div>
                    <label htmlFor='phone'>Phone:</label>
                  </div>
                  <div className='sub-details'>
                    <input
                      type='text'
                      id='phone'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <br />
                <div className='super--admin d-flex justify-content-between'>
                  <div>
                    <label htmlFor='email'>Password:</label>
                  </div>
                  <div className='sub-details'>
                    <input
                      type='password'
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <br />

                <button
                  className='subAdmin-btn'
                  type='button'
                  onClick={handleCreateAdmin}
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEstate;
