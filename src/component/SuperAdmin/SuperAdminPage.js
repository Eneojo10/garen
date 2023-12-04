import React from 'react';
import AdminDashboard from './AdminDashboard';
import AdminSideBar from '../SuperAdmin/AdminSideBar';
import Navigationz from './Navigationz';

function SuperAdminPage() {
  let is_superAdmin = localStorage.getItem('role');
  let is_logged_in = localStorage.getItem('user_id');

  let isSuperAdmin = is_superAdmin === 'SUPER ADMIN' ? true : false;
  let isLoggedIn = is_logged_in ? true : false;

  console.log('login ', isLoggedIn, isSuperAdmin);
  return (
    <div>
      {isLoggedIn && isSuperAdmin ? (
        <div className='dash_board d-flex'>
          <div className='users'>
            <AdminSideBar />
          </div>
          <div className='users_'>
            <Navigationz />
            <br />
            <br />
            <AdminDashboard />
          </div>
        </div>
      ) : (
        <>You don't have access to this page</>
      )}
    </div>
  );
}

export default SuperAdminPage;
