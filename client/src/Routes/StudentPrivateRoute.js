import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function StudentNAV() {

    return (

        <div className="container" >
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3">
                        <h2 >Student Management</h2>
                    </div>
                </div>
            </div>
            <br></br><br></br>
            <div class="sidebar">
                <Link to="/studentmanager/add"><buton type="submit" class="btn btn-primary">ADD STUDENT DETAILS </buton></Link><br></br><br></br>
                <Link to="/studentmanager/view"><buton type="submit" class="btn btn-secondary">VIEW STUDENT DETAILS</buton></Link>
                
            </div>


        </div>
    )
}