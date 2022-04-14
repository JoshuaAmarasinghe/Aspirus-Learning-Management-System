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
        <div>
            <form>
                <div class="form-group">

                    <label for="name">Corse Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter Corse Name"/>
    
                </div>
                <div class="form-group">
                    
                    <label for="discription">discription</label>
                    <input type="text" class="form-control" id="discription" placeholder="Breaf Discription About Corse"/>
    
                </div>
                <div class="form-group">
                    <label for="BgImage">BgImage</label>
                    <input type="file" class="form-control-file" id="BgImage"/>
                </div>
                
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )

}