import React from 'react';
import Left from './Left';
import Navigations from './Navigations';

function ReportHistory() {
  return (
    <div>
      <div className='report_history d-flex'>
        <div className='users'>
          <Left />
        </div>

        <div className='users_'>
          <Navigations />
          <br />

          <div className='sendreport-border'>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportHistory