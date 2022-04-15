import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function NoticeOrEventNAV() {

    return (

        <div>

            <div class="sidebar">
                <Link to="/noticeandeventManager/add"><h1>ADD NOTICE OR EVENT</h1></Link><br/>
                <Link to="/noticeandeventManager/view"><h1>VIEW NOTICES AND EVENTS</h1></Link>
                
            </div>


        </div>
    )
}