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
                        <table style={{ width: '100%' }}>
                            <tbody>
                            <tr>
                                <td>
                                    <p> Name : {staff.title} {staff.name} </p>
                                    <p> Gender : {staff.gender}</p>
                                    <p> Age : {staff.age} </p>
                                </td>
                                <td align="right">
                                    <p> {staff.email} </p>
                                    <p> {staff.qualification} </p>
                                    <p> {staff.address} </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <hr></hr>
                        <table className="my-4 mx-5">
                            <tbody>
                                <tr>
                                    <td><h5>xxx</h5></td>
                                    <td>
                                        <h5></h5>
                                    </td>
                                    <td><h5>&nbsp;</h5></td>
                                </tr>
                                <tr>
                                    <td><h5>xxx</h5></td>
                                    <td>
                                        <div>
                                            
                                        </div>
                                    </td>
                                    <td><h5>&nbsp;</h5></td>
                                </tr>
                                <tr>
                                    <td><h5></h5></td>
                                    <td>
                                        <div className="mb-2">
                                       
                                        </div>
                                    </td>
                                    <td>
                                        <h5>&nbsp;</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td><h5>xxxx</h5></td>
                                    <td>
                                        <div className="mb-2">
                                           
                                        </div>
                                    </td>
                                    <td><h5>&nbsp;</h5></td>
                                </tr>
                                <tr>
                                    <td><h5>xxxx</h5></td>
                                    <td>
                                        <div className="mb-2">
                                           
                                        </div>
                                    </td>
                                    <td><h5>&nbsp;</h5></td>
                                </tr>
                                <tr>
                                    <td><h5>xxxxx</h5></td>
                                    <td><h5>{staff.name}</h5></td>
                                    <td>
                                       
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <hr></hr>

                        <h4>Recent Courses </h4>
                        <br/>
                        <div className="blue-table">
                            <div className="blue-table, box-view-prescription">
                                
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