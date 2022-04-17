import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation,Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Avatar from '@material-ui/core/Avatar';
import onClickOutside from "react-onclickoutside";
import { blue } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
//import axios from 'axios';
import './Header.css';
import './Sidebar.css';

function Header() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState("");
    const [URL, setURL] = useState("/staff");
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebar, setSidebar] = useState(false);

    const SidebarItem = [
        {
          title: 'Aspirus LMS',
          path: '/',
          icon: <HomeIcon/>,
          cName: 'nav-text'
        },
        {
          title: 'Profile',
           path: `${URL}/profile`,
          icon: <PersonIcon/>,
          cName: 'nav-text'
        },
        {
            title: 'Courses',
            path: `/course/view`,
            icon: <AssignmentIcon/>,
            cName: 'nav-text'
        },
        {
          title: 'Events',
          path: `/events/${user._id}`,
          icon: <EventAvailableIcon/>,
          cName: 'nav-text'
        },
        {
            title: 'Staff',
            path: `/staff/${user._id}`,
            icon: <PeopleIcon/>,
            cName: 'nav-text'
          },
        {
            title: 'Feedback',
            path: `/staff/review/${user._id}`,
            icon: <FeedbackIcon />,
            cName: 'nav-text'
        }
    ];

    useEffect(() => {
        //check whether user has signed in
        if(localStorage.getItem("staffAuthToken") || localStorage.getItem("studentAuthToken") || localStorage.getItem("adminAuthToken") ){
            setIsSignedIn(true)

            //get user data
            if(localStorage.getItem("user")){
                setUser(JSON.parse(localStorage.getItem('user')))
            }

            if(localStorage.getItem("staffAuthToken")){
                setURL(`/staff`)
            }

            if(localStorage.getItem("studentAuthToken")){
                setURL(`/student`)
            }
        }else{
            setIsSignedIn(false)
        }
    }, [user._id,location])

    function profile() {
        navigate(`${URL}/profile/`)
    }

    function signin() {
        navigate('/staff/signin')
    }

    function signup() {
        navigate('/staff/signup')
    }
    
    //logout
    async function logout(){
        localStorage.clear();
        navigate('/')
    }

    const showSidebar = () => setSidebar(!sidebar);

    Header.handleClickOutside = () => setSidebar(false);

    function home(){
        navigate('/')
    }
    
    return (
        <header>
            <div className="container-fluid">
                <nav className="navbar navbar-inverse navbar-expand-lg navbar-light fixed-top header-bg">
                    <div className="container-fluid ">
                        <ul>
                            {sidebar ? <IconButton><DehazeIcon fontSize="large" style={{ color: blue[0] }}/></IconButton> :
                            <IconButton onClick={showSidebar}>
                                <DehazeIcon fontSize="large"/>
                            </IconButton>
                            }      
                        </ul>
                        <div className="header-title">
                            <h3 onClick={home}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Learning &nbsp; Management &nbsp; System</h3>
                        </div>
                        <ul className="mx-3">
                            {isSignedIn ?
                                <div>
                                    <IconButton onClick={profile}>
                                        <Avatar alt="user" src={`${user.imgUrl}`} />
                                    </IconButton> 
                                </div>
                                :
                                <div>
                                    <button className="btn btn-outline-primary mx-2" onClick={signin}>
                                        Sign In
                                    </button>
                                    <button className="btn btn-outline-primary" onClick={signup}>
                                        Sign Up
                                    </button>
                                </div>
                            }
                        </ul>
                    </div>
                </nav>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='mb-4 mt-3' align="center">
                            <img src="/images/Logo.png" width="150px" alt="logo"/>
                        </li>
                        {SidebarItem.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span className="nav-span">{item.title}</span>
                                </Link>
                            </li>
                        );
                        })}
                        {isSignedIn &&
                            <div className="sidebar-bottom" align="center">
                                <Button variant="contained" color="secondary" disableElevation size="small" onClick={logout}
                                endIcon={<ExitToAppIcon/>}>
                                    Log Out  
                                </Button>
                            </div>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Header.handleClickOutside
};

export default onClickOutside(Header, clickOutsideConfig);