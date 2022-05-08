import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header'
import StaffSignUp from './components/StaffManagement/SignUp/SignUp';
import StaffSignIn from './components/StaffManagement/SignIn/SignIn';
import Profile from './components/StaffManagement/Profile/Profile';

import AddCourse from './components/CorseManagement/Course/AddCourse';
import AllCourse from './components/CorseManagement/Course/AllCourse';
import AllContent from './components/CorseManagement/Content/AllContent';
import AddContent from './components/CorseManagement/Content/AddContent';
import ViewOneCourse from './components/CorseManagement/Course/viewOneCourse';
import ViewOneContent from './components/CorseManagement/Content/viewOneContent';
import Allcoursestd from './components/CorseManagement/Course/Allcoursestd';
import AllContentstd from './components/CorseManagement/Content/AllContentstd';
import UpdateProfile from './components/StaffManagement/UpdateProfile/UpdateProfile';
import AllStaffs from './components/StaffManagement/AllStaffs/AllStaffs';
import ViewNoticesAndEventsDetails from './components/noticeandevent-manager/ViewAllNoticesAndEvents';
import ViewOneNoticeOrEvent from './components/noticeandevent-manager/ViewOneNoticeOrEvent';
import AddNoticeOrEvent from './components/noticeandevent-manager/AddNoticeOrEvent';
import NoticeOrEventNAV from './Routes/NoticeAndEventRoutes';
import StudentNAV from './Routes/StudentPrivateRoute';
import AddStudent from './components/StudentManagement/AddStudent';
import ViewStudentDetails from './components/StudentManagement/ViewAllStudent';
import ViewOneStudent from './components/StudentManagement/ViewOneStudent';
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
              <Route exact path="/course/add" element={<AddCourse/>} />
              <Route exact path="/content/add" element={<AddContent/>} />
              <Route exact path="/course/view" element={<AllCourse/>} />
              <Route exact path="/content/view/:moduleId" element={<AllContent/>} />
              <Route exact path="/course/view/:id" element={<ViewOneCourse/>} />
              <Route exact path="/content/view/by/:id" element={<ViewOneContent/>} />
              <Route exact path="/course/views" element={<Allcoursestd/>} />
              <Route exact path="/content/views/:moduleId" element={<AllContentstd/>} />
              <Route exact path="/staff/update/:id" element={<UpdateProfile/>} />
              <Route exact path="/staff" element={<AllStaffs/>} />
              <Route exact path = "/noticeandeventManager/add" element={<AddNoticeOrEvent/>}/>
              <Route exact path = "/noticeandeventManager/view" element={<ViewNoticesAndEventsDetails/>}/>
              <Route exact path = "/noticeandeventManager/view/:id" element={<ViewOneNoticeOrEvent/>}/>
              <Route exact path = "/noticeandeventManager" element={<NoticeOrEventNAV/>}/>
              <Route exact path = "/studentmanager" element={<StudentNAV/>}/>
              <Route exact path = "/studentmanager/add" element={<AddStudent/>}/>
              <Route exact path = "/studentmanager/view" element={<ViewStudentDetails/>}/>
              <Route exact path = "/studentmanager/view/:id" element={<ViewOneStudent/>}/>
              <Route exact path="/staff/report/:id" element={<StaffReport/>} />
        </Routes>
        <Footer/>
       </div>
    </Router>
  );
}

export default App;
