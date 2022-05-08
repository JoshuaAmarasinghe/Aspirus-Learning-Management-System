import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert'
import axios from 'axios';
import validation from 'validator'



export default function AddStudent() {

    const [isLoading, setLoading] = useState(false);

    const[title, settitle]=useState("");
    const[fullname, setfullname]=useState("");
    const[itnumber, setitnumber]=useState("");
    const[gender, setgender]=useState("");
    const[nic, setnic]=useState("");
    const[birthday, setbirthday]=useState("");
    const[contactnumber, setcontactnumber]=useState("");
    const[address, setaddress]=useState("");
    const[email, setemail]=useState("");
    const[batch, setbatch]=useState("");
    const[password, setpassword]=useState("");
      


   async function submitData(e) {
    setLoading(true)
        try {
            e.preventDefault();
            if (!title || !fullname ||!itnumber || !gender || !nic || !birthday || !contactnumber || !address || !email ||!batch ||!password ) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please fill all fields",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }/*else if (!validation.isFullName(fullname)) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please enter valid date",
                    icon: "error",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }*/else {
                const newDetails = {
                    title,fullname,itnumber,gender,nic,birthday,contactnumber,address,email,batch,password

                }
                const data = await (await axios.post("http://localhost:8070/studentmanager/", newDetails)).status
                if(data === 200){
                    SoloAlert.alert({
                        title: "Welcome!",
                        body: "Data added successfully",
                        icon: "success",
                        theme: "dark",
                        useTransparency: true,
                        onOk: function () {
    
                        },
                    });
                }

            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    function clear() {

    }
    return (
        <div className="container" >
            <h3 style={{ marginTop:"100px"}}>ADD-Students-DETAILS</h3><hr />

            
            <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                 
            <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">TITLE</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { settitle(e.target.value) }} />
                </div>
               
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">FULLNAME</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setfullname(e.target.value) }} />
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip02" class="form-label">ITNUMBER</label>
                    <input type="text" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setitnumber(e.target.value) }} />
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip02" class="form-label">GENDER</label>
                    <input type="text" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setgender(e.target.value) }} />
                </div><br />
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">NIC</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setnic(e.target.value) }} />
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">CONTACTNUMBER</label>
                    <input type="number" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setcontactnumber(e.target.value) }} />
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">Bithday</label>
                    <input type="date" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setbirthday(e.target.value) }} />
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">ADDRESS</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setaddress(e.target.value) }} />
                </div>

                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">EMAIL</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setemail(e.target.value) }} />
                </div>


                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">BATCH</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setbatch(e.target.value) }} />
                </div>


                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">PASSWORD</label>
                    <input type="password" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setpassword(e.target.value) }} />
                </div>
                
                

                <div class="col-12" style={{ marginTop: "50px", marginLeft: "65%" }}>
                    <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => { clear(e) }}><i class="fa fa-ban"></i> Clear form</button>&nbsp;&nbsp;&nbsp;
                    <button type="submit" class="btn btn-primary" onClick={(e) => { submitData(e) }}
                        disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Sending..' : 'Submit form'}</button>
                </div>
            </form>

        </div>
    )
}
