import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function ViewStudentDetails() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [Allstudents, setAllstudents] = useState([]);

        //This useEffect function used to get all apoinment's data
        useEffect(() => {
            async function getDetails() {
                try {
                    const result = await (await axios.get("http://localhost:8130/student/")).data.data
                    setAllstudents(result);
                    setLoaderStatus(true)
                    setTableStatus(false)
                } catch (err) {
                    console.log(err.message)
                }
            }
           
            getDetails();
        })
    
    
        //This useEffect method is used to perform a searching function
        useEffect(() => {
            setfiltered(
                Allstudents.filter(items => {
                    return items.fullname.toLowerCase().includes(search.toLowerCase())
                       
                })
            )
           
        }, [search, Allstudents])


    return (
        <div class="content">

            <div class="d-flex justify-content-center" >
                <div class="spinner-border" role="status" style={{width: "10rem", height: "10rem",  marginTop:"100px"}} hidden={loaderStatus}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div hidden={tebleStatus}>{/* This part used to get all users data into table */}
                <nav className="navbar bg-white" >
                    <div className="container-fluid">
                        <h3>VIEW Students</h3>
                        <form className="d-flex"style={{ marginTop:"150px"}}>
                            <input  style={{ marginRight:"300px"}} type="search" placeholder="Search" aria-label="Search"
                                onChange={e => { setsearch(e.target.value) }} />
                        </form>
                    </div>
                </nav><hr />

                <div className="bodyContent">
                    <table className="table table-dark table-sm" >
                        <thead>
                            <tr >
                                <th scope="col">Clik Here To Edit</th>
                                <th scope="col">TITLE</th>
                                <th scope="col">FULLNAME</th>
                                <th scope="col">ITNUMBER</th>
                                <th scope="col">GENDER</th>
                                <th scope="col">NIC</th>
                                <th scope="col">BIRTHDAY</th>   
                                <th scope="col">CONTACTNUMBER</th> 
                                <th scope="col">ADDRESS</th>  
                                <th scope="col">EMAIL</th> 
                                <th scope="col">BATCH</th>  
                                <th scope="col">PASSWORD</th>
                                   
                                     
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.slice(0).reverse().map((Student) => <tr>
                                <td><Link to={"/student/view/" + Student._id} className="Edit"> EDIT<i className="far fa-edit"></i> </Link></td>
                                    <td>{Student.title}</td>
                                    <td>{Student.fullname}</td>
                                    <td>{Student.itnumber}</td>
                                    <td>{Student.gender}</td>
                                    <td>{Student.nic}</td>
                                    <td>{Student.birthday}</td>
                                    <td>{Student.contactnumber}</td>
                                    <td>{Student.address}</td>
                                    <td>{Student.email}</td>
                                    <td>{Student.batch}</td>
                                    <td>{Student.password}</td>
                                   
                                    <td><Link to={"/student/view/" + Student._id} className="Edit"> EDIT<i className="far fa-edit"></i> </Link></td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>

            </div>{/* End of the */}
        </div>
    )
}