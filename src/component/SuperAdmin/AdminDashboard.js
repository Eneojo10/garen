import React from 'react'

function AdminDashboard() {
  return (
    <div className='admin-board'>
      <div className='admin--cardholder'>
        <div className='admin-cardOne'>
          <div className='admin-card'>
            <div className='adminbaord-text'>
              <h5>TOTAL ESTATE</h5>
            </div>
          </div>
        </div>
        <div className='admin-cardOne'>
          <div className='admin-card'>
            <div className='adminbaord-text'>
              <h5>TOTAL ADMIN</h5>
            </div>
          </div>
        </div>
        <div className='admin-cardOne'>
          <div className='admin-card'></div>
        </div>
      </div>
      <div className='admin__cards'>
        <div className='admin-card_One'>
          <div className='admin-card'>
            <div className='adminbaord-text'>
              <h5>TOTAL ESTATE</h5>
            </div>
          </div>
        </div><br/>
        <div className='admin-card_One'>
          <div className='admin-card'>
            <div className='adminbaord-text'>
              <h5>TOTAL ADMIN</h5>
            </div>
          </div>
        </div><br/>
        <div className='admin-card_One'>
          <div className='admin-card'>
            <div className='adminbaord-text'>
              <h5>TOTAL ESTATE</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard