import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import axios from 'axios';
import './Course.css';


export default function AddCourse(){
    const [moduleId,setModuleId] = useState("");
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [image,setImage] = useState("");
   

    




    
    //send data to database
    function sendData(e){
        e.preventDefault();
        const newCourse ={
            moduleId,
            name,
            description,
            image
            
        }

        axios.post("http://localhost:8070/course/add",newCourse).then(()=>{
            alert("course added")
            setName("");
            setDescription("");
            setImage("");
            
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        
        <div className="container" align="center">
            <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-11">
                        <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                            <h2>Add Course</h2>
                        </div>
                    </div>
                </div>
            <form className="boxSignUp" onSubmit={sendData}>
            <div className="col-md-6 mb-4">
                    <div className="form-group">

                        <label for="name">Module Code</label>
                        <input type="text" className="form-control" id="moduleId" placeholder="Enter module code"
                        onChange={(e)=>{
                            setModuleId(e.target.value);
                        }}/>

                    </div>

                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-group">

                        <label for="name">Course Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter Course Name"
                        onChange={(e)=>{
                            setName(e.target.value);
                        }}/>

                    </div>

                </div>
                
                <div className="form-group">
                    
                    <label for="description">description</label>
                    <textarea type="text" className="form-control" id="description" placeholder="Breaf Description About Course" rows="4" cols="50"
                    onChange={(e)=>{
                        setDescription(e.target.value);
                    }}/>
    
                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-group">

                        <label for="name">Image URL</label>
                        <input type="url" className="form-control" id="image" placeholder="Enter image URL"
                        onChange={(e)=>{
                            setImage(e.target.value);
                        }}/>

                    </div>

                </div>
                <br></br>
                <div className="form-group">
                <div>
                                
                </div>
                </div>
                <br></br>
                <div className="row">
                                
                    <div className="form-group">
                        <input className="form-submit-btn" type="submit" value="Add" />
                    </div>
                            
                </div>
                
               
            </form>
            
        </div>
    )

}