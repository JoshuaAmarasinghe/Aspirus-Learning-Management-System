import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import UpdateIcon from '@material-ui/icons/Update';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { green,blue, red} from '@material-ui/core/colors';
import './Profile.css';

function Profile() {
    const [staff,setStaff] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate =useNavigate();
    const location =useLocation();
    
    useEffect(() => {
         async function fetchUser(){
              await axios.get(`http://localhost:8070/staff/${staff._id}`).then((res)=>{
                    localStorage.setItem('user',JSON.stringify(res.data.result)) 
                    setStaff(JSON.parse(localStorage.getItem('user')))
                }).catch((error)=>{
                    alert("Failed to fetch item data")
                })
            }
            fetchUser()
     
    },[staff._id,location])

    async function deleteStaff(id){
        const config={
            headers:{
                "content-Type":"application/json"
            }
        }

        await axios.delete(`http://localhost:8070/staff/delete/${id}`,config).then(() =>{
            alert("Your Profile has been Deleted")
            localStorage.clear()
            navigate('/staff/signin')
        }).catch((error)=>{
            alert("Remove Failed!");
        })
    }
    
    const logout = () => {
        localStorage.clear();
        navigate(`/staff/signin`)
    };
        
     const update =() =>{
        navigate(`/staff/update/${staff._id}`)
     }
 
    const report =() =>{
        navigate(`/staff/report/${staff._id}`)
    }
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3">
                        <h2 >My Profile</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-9">
                    <div className="row staff-card align-items-center">
                        <div className="col-xl-3">
                            <div className="staffProfile_img">
                                {staff.imgUrl === "" ?
                                    <img src="/images/user-img.png" className="rounded-circle" alt="profile pic"/>
                                :
                                    <img src={`${staff.imgUrl}`}
                                    className="rounded-circle" alt="profile pic"/>
                                }
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <h4>{staff.title} {staff.name}</h4>
                            <h5><VerifiedUserIcon style={{ color: blue[700] }}/> {staff.role}</h5>
                        </div>
                        <div className="row mt-5">
                            <h4>User details</h4>
                            <hr></hr>
                            <div className="col-xl-4">
                                <h5>Address</h5>
                                <h6>{staff.address}</h6>
                            </div>
                            <div className="col-xl-4">
                                <h5>Email</h5>
                                <h6>{staff.email}</h6>
                            </div>
                            <div className="col-xl-4">
                                <h5>Qualifications</h5>
                                <h6>{staff.qualification}</h6>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-xl-4">
                                <h6>Gender</h6>
                                <h7>{staff.gender}</h7>
                            </div>
                            <div className="col-xl-4">
                                <h6>Age</h6>
                                <h7>{staff.age}</h7>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <h4>Enrolled Course</h4>
                            <hr></hr>
                            <div className="col-xl-4">
                                <h6>N/A</h6>
                            </div>
                        </div>

                    </div>   
                </div>
                <div className="col-xl-3 px-5" align="center">                   
                    <Button
                        className="mb-4 mt-4"
                        variant="contained"
                        color="primary"
                        endIcon={<UpdateIcon />}
                        onClick={update}
                        disableElevation
                        fullWidth
                    >
                        Update Profile
                    </Button>  
                    <br/>                                             
                    <Button
                        className="mb-4"
                        variant="contained"
                        color="secondary"
                        style={{ backgroundColor: green[400], color: 'white'}}
                        disableElevation
                        onClick={report}
                        fullWidth
                    >
                        Generate Report
                    </Button>
                    <br/>
                    <Button
                        className="mb-4"
                        variant="contained"
                        color="secondary"
                        endIcon={<DeleteIcon />}
                        style={{ backgroundColor: red[700], color: 'white'}}
                        fullWidth
                        disableElevation
                        onClick={() => deleteStaff(staff._id)} 
                    >
                        Delete Profile
                    </Button>  
                        <br/>   
                    <Button
                        className="mb-4"
                        variant="contained"
                        color="secondary"
                        endIcon={<ExitToAppIcon />}
                        style={{ backgroundColor: blue[500], color: 'white'}}
                        fullWidth  
                        disableElevation   
                        onClick={logout}
                    >
                        Logout 
                    </Button>                           
                </div>
            </div>    
            <div className="row mt-3">
                <div className="col-6">                 
                </div>
                <div className="col-6">                   
                </div>
            </div>            
        </div>
        )
}

export default Profile