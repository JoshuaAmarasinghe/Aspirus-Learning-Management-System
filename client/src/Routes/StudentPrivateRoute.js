import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function StudentNAV() {

    return (

        <div>

            <div class="sidebar">
                <Link to="/studentmanager/add"><h1>ADD STUDENT DETAILS</h1></Link>
                <Link to="/studentmanager/view"><h1>VIEW STUDENT DETAILS</h1></Link>
                
            </div>


        </div>
    )
}