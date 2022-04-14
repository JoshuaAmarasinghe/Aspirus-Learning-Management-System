import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import UpdateIcon from '@material-ui/icons/Update';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { green,blue} from '@material-ui/core/colors';
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