import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jspdf from 'jspdf';
import "jspdf-autotable";
import "bootstrap-icons/font/bootstrap-icons.css";



import './Course.css';
import Course from './Coursestd';

//import Course from '../../../../../server/models/course';



export default function AllCourse(){

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);

    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const[courses, setCourses] = useState([]);

    //This useEffect function used to get all Notices and Events data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:8070/course/")).data.data
                setCourses(result);
                setLoaderStatus(true)
                setTableStatus(false)
            } catch (err) {
                console.log(err.message)
            }
        }
       
        getDetails();
    })


    /*useEffect(() => {
        async function getCourses(){
            axios.get("http://localhost:8070/course/").then((res) =>{
                setCourses(res.data);
                
            }).catch((err) => {
                alert(err.massage);
            })
        }
        getCourses();
    },[courses])*/


    //This function used to generate a pdf
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = ["name", "description"];
        const tableRows = [];

        tickets.slice(0).reverse().map(ticket => {
            const ticketData = [
                ticket.name,
                ticket.description,
                
                
            ];
            tableRows.push(ticketData);
        });

        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        doc.text("Content-Details", 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
        doc.save(`Content-Details_${dateStr}.pdf`);

    }

     //This useEffect method is used to perform a searching function
     useEffect(() => {
        setfiltered(
            courses.filter(items => {
                return items.name.toLowerCase().includes(search.toLowerCase())
                    || items.description.toLowerCase().includes(search.toLowerCase())
                    
            })
        )
       
    }, [search, courses])

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
                        <h3>VIEW COURSES</h3>
                        <form className="d-flex"style={{ marginTop:"150px"}}>
                            <input  style={{ marginRight:"300px"}} type="search" placeholder="Search" aria-label="Search"
                                onChange={e => { setsearch(e.target.value) }} />
                        </form>
                    </div>
                </nav><hr />
                

                <div>
                
                    {filtered.slice(0).reverse().map((course, index) => (
                        
                      
                        <><Course name={course.name} description={course.description} image={course.image} id={course._id} moduleId={course.moduleId} /></>
                        
                    ))}
                   
                    
                 
                


            
                   

                </div>

            </div>{/* End of the */}
        </div>
    )
}

    



