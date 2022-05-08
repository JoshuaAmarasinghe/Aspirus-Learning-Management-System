import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import axios from 'axios';
import './Content.css';


export default function AddContent(){
    const [moduleId,setModuleId] = useState("");
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    
    //const [file,setFile] = useState("");

    




    
    //send data to database
    function sendData(e){
        e.preventDefault();
        const newContent ={
            moduleId,
            title,
            description,
            //file
            
        }

        axios.post("http://Localhost:8070/content/add/add",newContent).then(()=>{
            alert("content added")
            setModuleId("");
            setTitle("");
            setDescription("");
            //setFile("");
            
        }).catch((err)=>{
            alert(err.message)
        })
    }

    return(
        
        <div className="container" align="center">
            <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-11">
                        <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                            <h2>Add Content</h2>
                        </div>
                    </div>
                </div>
            <form className="boxSignUp" onSubmit={sendData}>
            <div className="col-md-6 mb-4">
                    <div className="form-group">

                        <label for="name">Module Code</label>
                        <input type="text" className="form-control" id="name" 
                        onChange={(e)=>{
                            setModuleId(e.target.value);
                        }}/>

                    </div>

                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-group">

                        <label for="name">Content Title</label>
                        <input type="text" className="form-control" id="name" 
                        onChange={(e)=>{
                            setTitle(e.target.value);
                        }}/>

                    </div>

                </div>
                
                <div className="form-group">
                    
                    <label for="description">description</label>
                    <textarea type="text" className="form-control" id="description" placeholder="Breaf Description About Content" rows="4" cols="50"
                    onChange={(e)=>{
                        setDescription(e.target.value);
                    }}/>
    
                </div>
                <br></br>
                <div className="form-group">
                {/* <div>
                    <input type="file" id="myFile" name="filename"
                     onChange={(e)=>{
                        //setFile(e.target.value);
                    }}/>
                </div> */}
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