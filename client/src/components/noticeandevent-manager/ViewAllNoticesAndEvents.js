import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import "jspdf-autotable"
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ViewNoticesAndEventsDetails() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllNoticesAndEvents, setAllNoticesAndEvents] = useState([]);

        //This useEffect function used to get all apoinment's data
        useEffect(() => {
            async function getDetails() {
                try {
                    const result = await (await axios.get("http://localhost:8070/noticeandeventManager/")).data.data
                    setAllNoticesAndEvents(result);
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
                AllNoticesAndEvents.filter(items => {
                    return items.date.toLowerCase().includes(search.toLowerCase())
                        || items.category.toLowerCase().includes(search.toLowerCase())
                        || items.createdby.toLowerCase().includes(search.toLowerCase())
                        
                })
            )
           
        }, [search, AllNoticesAndEvents])


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
                        <h3>VIEW NOIICES AND EVENTS</h3>
                        <form className="d-flex"style={{ marginTop:"150px"}}>
                            <input  style={{ marginRight:"300px"}} type="search" placeholder="Search" aria-label="Search"
                                onChange={e => { setsearch(e.target.value) }} />
                        </form>
                    </div>
                </nav><hr />

                <div className="bodyContent">
                    <table className="table table-bordered table-dark" >
                        <thead>
                            <tr >
                                <th scope="col">DATE</th>
                                <th scope="col">TIME</th>
                                <th scope="col">CATEGORY</th>
                                <th scope="col">TPOIC</th>
        
                                       
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((NoticeAndEvent) => {
                                return <tr >
                                    <td>{NoticeAndEvent.date}</td>
                                    <td>{NoticeAndEvent.time}</td>
                                    <td>{NoticeAndEvent.category}</td>
                                    <td>{NoticeAndEvent.topic}</td>   
                                    <td><Link to={"/noticeandeventManager/view/" + NoticeAndEvent._id} className="Edit"> <i className="far fa-edit" ></i> </Link></td>
                                </tr>

                            })}
                        </tbody>
                    </table>
                </div>

            </div>{/* End of the */}
        </div>
    )
}
