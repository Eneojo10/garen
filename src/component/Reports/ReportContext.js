import React, { createContext, useState, useContext } from 'react';

export const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [viewedReports, setViewedReports] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const markReportAsViewed = (reportId) => {
    setViewedReports((prevViewedReports) =>
      prevViewedReports.includes(reportId)
        ? prevViewedReports
        : [...prevViewedReports, reportId]
    );

    setNotificationCount(notificationCount - 1);
  };

  const getUnviewedReportCount = () => {
    return notificationCount;
  };

  return (
    <ReportContext.Provider
      value={{
        viewedReports,
        markReportAsViewed,
        getUnviewedReportCount,
        notificationCount,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => {
  return useContext(ReportContext);
};
