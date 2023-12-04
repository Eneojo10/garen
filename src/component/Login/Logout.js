import React, { useContext } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router';

function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <div>
      <div className='dash d-flex gap-2'>
        <div>
          <AiOutlineLogout />
        </div>
        <div className='logout '>
          <button
            onClick={handleLogout}
            className='loc--btn'
            style={{
              background: 'transparent',
              border: 'none',
              color: 'black',
              fontWeight: '600',
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
