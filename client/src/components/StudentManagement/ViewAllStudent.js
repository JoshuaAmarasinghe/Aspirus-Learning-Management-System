import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

export default function ViewStudentDetails(){

    const [Allstudents, setAllstudents] = useState([]);
    useEffect(()=>{
        function getAllstudents(){
            axios.get("http://localhost:8070/studentmanager/").then((res)=>{
                setAllstudents(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getAllstudents();
    })

   
    return(
        <div >
            {Allstudents.map((Student)=>{
                return(
                    <table class="table table-dark" key={Student._id}>
                        <thead>
                            <tr>
                            
                            <th scope="col">TITLE</th>
                            <th scope="col">FULL NAME</th>
                            <th scope="col">IT NUMBER</th>
                            <th scope="col">GENDER</th>
                            <th scope="col">NIC</th>
                            <th scope="col">BIRTHDAY </th>
                            <th scope="col">CONTRACT </th>
                            <th scope="col">ADDRESSES </th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">BATCH</th>
                            <th scope="col">PASSWORD</th>
                            <th scope="col">ADVANCED </th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                           
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
                            <td> <Link to={"/studentmanager/view/" + Student._id} className="Edit"> EDIT<i className="far fa-edit"></i> </Link></td>

                            </tr>
                           
                            
                           
                        </tbody>
                        
                    
                     </table>
                )
            })}
                        
        </div>

    )
}

