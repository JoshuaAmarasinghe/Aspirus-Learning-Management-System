import React,{useRef, useState, useEffect} from 'react';
import { useReactToPrint } from "react-to-print";
import { orange, green, red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import axios from 'axios';
import './StaffReport.css';

function StaffReport() {  
    const [staff,setStaff] = useState(JSON.parse(localStorage.getItem('user')));
    const componentRef = useRef();

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
    
   },[staff._id])

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div class="container">
            <div className="box-report">
                <div id="report" ref={componentRef}>
                    <table style={{ width: '90%' }} align="center">
                        <tr>
                            <td align='left'>
                                <img src="/images/Logo.png" width="100px" alt="logo" />
                            </td>
                            <td align='center'>
                                <h3>Aspirus Learning Management</h3>
                                <h5> User Report</h5>
                            </td>
                            <td align='right'>
                                <p></p>
                            </td>
                        </tr>
                    </table>
                    <hr/>
                    <div className="prescription px-4">
                    <h5 align="center">User Details</h5>
                    <br></br>
                        <table style={{ width: '100%' }}>
                            <tbody>
                            <tr>
                                <td align="left">
                                    <p> Name : {staff.title} {staff.name} </p>
                                    <p> Gender : {staff.gender}</p>
                                    <p> Age : {staff.age} </p>
                                    <p> Address : {staff.address} </p>
                                    <p> NIC : {staff.nic} </p>
                                    <p> User Role : {staff.role} </p>
                                    <p> {staff.email}</p>
                                    <p> {staff.qualification} </p>
                                    <p> {staff.phoneno} </p>
                                </td>

                            </tr>
                            </tbody>
                        </table>
                        <br></br>
                        <h5>Recent Courses </h5>
                        <div className="blue-table">
                            <div>
                                <p>N/A</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div align="center">
                <Button variant="contained" className="mb-4" disableElevation size="large" onClick={handlePrint}
                    style={{ backgroundColor: green[400], color: 'white' }} endIcon={<CloudDownloadIcon/>}>
                    Download Report
                </Button>
            </div>
        </div>
    )
}
export default StaffReport