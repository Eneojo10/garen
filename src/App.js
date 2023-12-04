import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Panel from './component/Panel';
import Compo from './component/Compo';
import Dark from './component/Dark';
import ResidentForm from './component/Residence/ResidentForm';
import AllResidents from './component/Residence/AllResidents';
import AddPayments from './component/Payments/AddPayments';
import PaymentsInfo from './component/Payments/PaymentsInfo';
import PaymentCompliance from './component/Payments/PaymentCompliance';
import ViewReports from './component/Reports/ViewReports';
import PendingiReports from './component/Reports/PendingiReports';

import PrivateRoutes from './utils/PrivateRoutes';
import Navigation from './component/Navigation';
import Login from './component/Login/Login';
import SingleResidentProfile from './component/Residence/SingleResidentProfile';

import Logout from './component/Login/Logout';
import AuthProvider, { AuthContext } from './component/Login/AuthContext';
import GenerateReport from './component/Reports/GenerateReport';
import ReportDetails from './component/Reports/ReportDetails';

import SearchForm from './component/SearchForm';
import SearchResults from './component/SearchResults';
import { ReportProvider } from './component/Reports/ReportContext';
import LineChart from './component/LineChart';

import Hamburger from './component/Hamburgers/Hamburger'
import Hamburger2 from './component/Hamburgers/Hamburger2';
import Hamburger3 from './component/Hamburgers/Hamburger3';
import PaymentsDetails from './component/Payments/PaymentsDetails';
import Footer from './component/Footer';
import Config from './component/Config';
import ViewAllArtisan from './component/Artisan/ViewAllArtisan';
import AddArtisan from './component/Artisan/AddArtisan';
import Dashboard from './component/Users/Dashboard';
import Left from './component/Users/Left';
import SendReport from './component/Users/SendReport';
import Navigations from './component/Users/Navigations';
import ReportHistory from './component/Users/ReportHistory';
import SuperAdminPage from './component/SuperAdmin/SuperAdminPage';
import AdminSideBar from './component/SuperAdmin/AdminSideBar';
import AdminDashboard from './component/SuperAdmin/AdminDashboard';
import CreateEstate from './component/SuperAdmin/CreateEstate';
import Navigationz from './component/SuperAdmin/Navigationz';

// import { useContext } from 'react';

function App() {
  return (
    <ReportProvider>
      <AuthProvider>
        <div className='App'>
          <Router>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path='/dashboard' element={<Dashboard />} />

                <Route path='/panel' element={<Panel />} />

                {/* <Route element={<Users />} path='/users' /> */}
                <Route path='/Compo' element={<Compo />} />
                <Route
                  path='/residence/:usersId/:identificationCode'
                  element={<SingleResidentProfile />}
                />
                <Route path='/addpayments' element={<AddPayments />} />
                <Route path='/dark' element={<Dark />} />
                <Route path='/compliance' element={<PaymentCompliance />} />
                <Route path='/paymentsInfo' element={<PaymentsInfo />} />
                <Route path='/navigation' element={<Navigation />} />
                <Route path='/viewReports' element={<ViewReports />} />
                <Route path='/pending' element={<PendingiReports />} />

                <Route path='/ResidentForm' element={<ResidentForm />} />
                <Route path='/allResidents' element={<AllResidents />} />
                <Route path='/generate' element={<GenerateReport />} />

                <Route path='/logout' element={<Logout />} />
                <Route
                  path='/ReportDetails/:ireportId'
                  element={<ReportDetails />}
                />

                <Route path='/searchform' element={<SearchForm />} />
                <Route path='/searchresult' element={<SearchResults />} />
                <Route path='/linechart' element={<LineChart />} />

                <Route path='/hamburger' element={<Hamburger />} />
                <Route path='/ham' element={<Hamburger2 />} />
                <Route path='/hamm' element={<Hamburger3 />} />
                <Route
                  path='/Payments/:paymentsId'
                  element={<PaymentsDetails />}
                />
                <Route path='/footer' element={<Footer />} />
                <Route path='/config' element={<Config />} />
                <Route path='/addartisan' element={<AddArtisan />} />
                <Route path='/viewall' element={<ViewAllArtisan />} />

                <Route path='/left' element={<Left />} />
                <Route path='/ireport' element={<SendReport />} />
                <Route path='/navigations' element={<Navigations />} />
                <Route path='/history' element={<ReportHistory />} />
                <Route path='/superAdmin' element={<SuperAdminPage />} />
                <Route path='/adminsidebar' element= {<AdminSideBar/>} />
                <Route path='/adminboard' element= {<AdminDashboard/>} />
                <Route path='/createEstate' element= {<CreateEstate/>} />
                <Route path='/superNav' element= {<Navigationz/>} />
              </Route>
              <Route element={<Login />} path='/' />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </ReportProvider>
  );
}

export default App;
