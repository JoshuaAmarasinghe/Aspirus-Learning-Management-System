import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Homepage from './components/Home/Homepage';
import StaffSignUp from './components/StaffManagement/SignUp/SignUp';
import StaffSignIn from './components/StaffManagement/SignIn/SignIn';
import Profile from './components/StaffManagement/Profile/Profile';
import UpdateProfile from './components/StaffManagement/UpdateProfile/UpdateProfile';
import AllStaffs from './components/StaffManagement/AllStaffs/AllStaffs';
import ViewNoticesAndEventsDetails from './components/noticeandevent-manager/ViewAllNoticesAndEvents';
import ViewOneNoticeOrEvent from './components/noticeandevent-manager/ViewOneNoticeOrEvent';
import AddNoticeOrEvent from './components/noticeandevent-manager/AddNoticeOrEvent';
import NoticeOrEventNAV from './Routes/NoticeAndEventRoutes';
import StaffReport from './components/StaffManagement/Report/StaffReport';
import Staff from './components/StaffManagement/AllStaffs/AllStaffs'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
              <Route exact path="/" element={<Staff/>} />
              <Route exact path="/staff/signup" element={<StaffSignUp/>} />
              <Route exact path="/staff/signin" element={<StaffSignIn/>} />
              <Route exact path="/staff/signin" element={<StaffSignIn/>} />
              <Route exact path="/staff/profile" element={<Profile/>} />
              <Route exact path="/staff/update/:id" element={<UpdateProfile/>} />
              <Route exact path="/staff" element={<AllStaffs/>} />
              <Route exact path = "/noticeandeventManager/add" element={<AddNoticeOrEvent/>}/>
              <Route exact path = "/noticeandeventManager/view" element={<ViewNoticesAndEventsDetails/>}/>
              <Route exact path = "/noticeandeventManager/view/:id" element={<ViewOneNoticeOrEvent/>}/>
              <Route exact path = "/noticeandeventManager" element={<NoticeOrEventNAV/>}/>
              <Route exact path = "/noticeandeventManager/add" element={<AddNoticeOrEvent/>}/>
              <Route exact path = "/noticeandeventManager/view" element={<ViewNoticesAndEventsDetails/>}/>
              <Route exact path = "/noticeandeventManager/view/:id" element={<ViewOneNoticeOrEvent/>}/>
              <Route exact path="/staff/report/:id" element={<StaffReport/>} />
        </Routes>
        <Footer/>
       </div>
    </Router>
  );
}

export default App;
