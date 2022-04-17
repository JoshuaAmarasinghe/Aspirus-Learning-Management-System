import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header'
import Homepage from './components/Home/Homepage';
import StaffSignUp from './components/StaffManagement/SignUp/SignUp';
import StaffSignIn from './components/StaffManagement/SignIn/SignIn';
import Profile from './components/StaffManagement/Profile/Profile';
import AddCourse from './components/CorseManagement/Course/AddCourse';
import AllCourse from './components/CorseManagement/Course/AllCourse';
import AllContent from './components/CorseManagement/Content/AllContent';
import AddContent from './components/CorseManagement/Content/AddContent';
import ViewOneCourse from './components/CorseManagement/Course/viewOneCourse';
import ViewOneContent from './components/CorseManagement/Content/viewOneContent';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
              <Route exact path="/" element={<Homepage/>} />
              <Route exact path="/staff/signup" element={<StaffSignUp/>} />
              <Route exact path="/staff/signin" element={<StaffSignIn/>} />
              <Route exact path="/staff/signin" element={<StaffSignIn/>} />
              <Route exact path="/staff/profile" element={<Profile/>} />

              {/*course routes */}
              <Route exact path="/course/add" element={<AddCourse/>} />
              <Route exact path="/content/add" element={<AddContent/>} />
              <Route exact path="/course/view" element={<AllCourse/>} />
              <Route exact path="/content/view" element={<AllContent/>} />
              <Route exact path="/course/view/:id" element={<ViewOneCourse/>} />
              <Route exact path="/content/view/:id" element={<ViewOneContent/>} />

        </Routes>
        
        
       
        

      </div>
    </Router>
  );
}

export default App;
