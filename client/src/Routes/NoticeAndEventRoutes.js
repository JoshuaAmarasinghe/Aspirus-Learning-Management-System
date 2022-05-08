import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function NoticeOrEventNAV() {

    return (

        <div className="container" >
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3">
                        <h2 >Notice Management</h2>
                    </div>
                </div>
            </div>
            <br></br><br></br>
            <div class="sidebar">
                <Link to="/noticeandeventManager/add"><button type="submit" class="btn btn-primary">ADD NOTICE OR EVENT</button></Link><br/><br></br>
                <Link to="/noticeandeventManager/view"><button type="submit" class="btn btn-secondary">VIEW NOTICES AND EVENTS</button></Link>
                
            </div>


        </div>
    )
}