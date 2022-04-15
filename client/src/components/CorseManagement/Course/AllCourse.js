import React, {useState, useEffect} from 'react';




export default function AllCourse(){


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