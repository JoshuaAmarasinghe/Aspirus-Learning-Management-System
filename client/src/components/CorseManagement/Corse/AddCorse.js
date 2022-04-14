import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from 'axios';
import './Corse.css';


export default function AddCorse(){

    return(
        <div class="container" align="center">
            <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-11">
                        <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                            <h2>Add Corse</h2>
                        </div>
                    </div>
                </div>
            <form className="boxSignUp">
                <div className="col-md-6 mb-4">
                    <div class="form-group">

                        <label for="name">Corse Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter Corse Name"/>

                    </div>

                </div>
                
                <div class="form-group">
                    
                    <label for="discription">discription</label>
                    <textarea type="text" class="form-control" id="discription" placeholder="Breaf Discription About Corse" rows="4" cols="50"/>
    
                </div>
                <br></br>
                <div class="form-group">
                    <label for="BgImage">background immage</label>
                    <br></br>
                    <input type="file" class="form-control-file" id="BgImage"/>
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