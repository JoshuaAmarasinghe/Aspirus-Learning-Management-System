import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Homepage from './components/Home/Homepage';
import StaffSignUp from './components/StaffManagement/SignUp/SignUp';
import StaffSignIn from './components/StaffManagement/SignIn/SignIn';
import Profile from './components/StaffManagement/Profile/Profile';
import AddCourse from './components/CorseManagement/Course/AddCourse';
import AllCourse from './components/CorseManagement/Course/AllCourse';


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
        </Routes>
        
        
        <Routes>
              <Route exact path="/course/add" element={<AddCourse/>} />
              <Route exact path="/course/allcourse" element={<AllCourse/>} />
             
        </Routes>
        

      </div>
    </Router>
  );
}

export default App;
