import React, { useState, useEffect, useContext, useRef } from 'react';
import Left from './Left';
import Navigations from './Navigations';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';

function SendReport() {
  const user_id = localStorage.getItem('user_id');
  const avatarInputRef = useRef();


  const [formData, setFormData] = useState({
    description: '',
    risk: '',
    date: '',
    avatar: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;

    // Validate file types
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const validFiles = Array.from(files).filter((file) =>
      allowedFileTypes.includes(file.type)
    );

    setFormData({ ...formData, avatar: [...formData.avatar, ...validFiles] });
  };

  useEffect(() => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    setFormData({ ...formData, date: formattedDate });
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('description', formData.description);
    formDataToSend.append('risk', formData.risk);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('user_id', user_id);

    for (const avatar of formData.avatar) {
      formDataToSend.append('avatar', avatar);
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/ireports',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // console.log(response.data);

      setFormData({
        description: '',
        risk: '',
        avatar: [],
      });

      
      avatarInputRef.current.value = '';
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <div className='send_ireport d-flex'>
        <div className='users'>
          <Left />
        </div>

        <div className='users_'>
          <Navigations />
          <br />

          <div className='sendreport-border'>
            <div className='report__feild_ py-4'>
              <form onSubmit={handleSubmit}>
                <h5>Description:</h5>
                <div className='text-area'>
                  <textarea
                    type='text'
                    name='description'
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <br />
                <b>Risk:</b>
                <div className='radio_btn'>
                  <div>
                    <input
                      type='radio'
                      name='risk'
                      value='High'
                      checked={formData.risk === 'High'}
                      onChange={handleInputChange}
                    />
                    High
                  </div>
                  <div>
                    <input
                      type='radio'
                      name='risk'
                      value='Very High'
                      checked={formData.risk === 'Very High'}
                      onChange={handleInputChange}
                    />
                    Very High
                  </div>
                  <div>
                    <input
                      type='radio'
                      name='risk'
                      value='Low'
                      checked={formData.risk === 'Low'}
                      onChange={handleInputChange}
                    />
                    Low
                  </div>
                </div>
                <br />
                <b>Date:</b>
                <div className='user_date'>
                  <input
                    type='text'
                    name='date'
                    value={formData.date}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
                <br />
                <b>Images:</b>
                <div>
                  <input
                    type='file'
                    name='avatar'
                    accept='image/*'
                    multiple
                    onChange={handleImageChange}
                    ref={avatarInputRef}
                  />
                </div>
                <br />
                <button className='report_but-ton' type='submit'>
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendReport;
