import React, { useState, useEffect } from 'react'
import SoloAlert from 'soloalert'
import { useParams } from "react-router-dom";
import axios from 'axios';
import jspdf from 'jspdf';
import "jspdf-autotable";
//import { format } from "date-fns";


export default function ViewOneStudent() {

    const [isLoading, setLoading] = useState(false);

    const [textState, setTextState] = useState(true);
    const [btngrpState1, setBtnGroupstate1] = useState(true);
    const [btngrpState2, setBtnGroupstate2] = useState(false);



    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);

     
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


    const { id } = useParams();


    const [AllStudents, setAllStudents] = useState([]);
    //This useEffect function used to get all  data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:8070/studentmanager/")).data.data
                setAllStudents(result);
                setLoaderStatus(true)
                setTableStatus(false)
            } catch (err) {
                console.log(err.message)
            }
        }
       
        getDetails();
    })
   
     //This function used to generate a pdf
     
     
   function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = ["title", "fullname", "itnumber","gender","nic","birthday","contactnumber","address","email","batch","password"];
        const tableRows = [];

       
        tickets.slice(0).reverse().map(ticket => {
            const ticketData = [
                ticket.title,
                ticket.fullname,
                ticket.itnumber,
                ticket.gender,
                ticket.nic,
                ticket.birthday,
                ticket.contactnumber,
                ticket.address,
                ticket.email,
                ticket.batch,
                ticket.password,
                
            ];
            tableRows.push(ticketData);
        });

        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        doc.text("Content-Details", 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
        doc.save(`Content-Details_${dateStr}.pdf`);

    }

    //This useEffect function used to get all Notices and Events data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get(`http://localhost:8070/studentmanager/${id}`)).data.data
                settitle(result[0].title);
                setfullname(result[0].fullname);
                setitnumber(result[0].itnumber);
                setgender(result[0].gender);
                setnic(result[0].nic);
                setbirthday(result[0].birthday);
                setcontactnumber(result[0].contactnumber);
                setaddress(result[0].address);
                setemail(result[0].email);
                setbatch(result[0].batch);
                setpassword(result[0].password);


                setLoaderStatus(true)
                setTableStatus(false)
                console.log(fullname,itnumber)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    }, [])


    async function updateData(e) {

        try {
            e.preventDefault();
            const newDetails = {
                title,fullname,itnumber,gender,nic,birthday,contactnumber,address,email,batch,password
            }
            const data = await (await axios.put(`http://localhost:8070/studentmanager/${id}`, newDetails)).status
            if (data === 200) {
                SoloAlert.alert({
                    title: "Welcome!",
                    body: "Details added successfully",
                    icon: "success",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {
                        window.location = "/studentmanager/view"
                    },
                });
            } else {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Something went wrong.. plz try again later",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }
        } catch (err) {

        }

    }

    function edit(e) {
        e.preventDefault();
        setTextState(false)
        setBtnGroupstate1(false)
        setBtnGroupstate2(true)
    }

    function cancel(e) {
        e.preventDefault();
        setTextState(true)
        setBtnGroupstate1(true)
        setBtnGroupstate2(false)
    }


    //This function is used to delete specific Notice or Event
    function deleteStudent(e) {
        e.preventDefault();

        SoloAlert.confirm({

            title: "Confirm Delete",
            body: "Are you sure",
            theme: "dark",
            useTransparency: true,
            onOk: async function () {

                try {
                    const result = await (await axios.delete(`http://localhost:8070/studentmanager/${id}`)).status
                    console.log(result)

                    if (result === 200) {
                        SoloAlert.alert({
                            title: "Welcome!",
                            body: "Deletion is successful",
                            icon: "success",
                            theme: "dark",
                            useTransparency: true,
                            onOk: function () {
                                window.location = "/studentmanager/view"
                            },

                        });
                    }
                } catch (err) {
                    SoloAlert.alert({
                        title: "Oops!",
                        body: "Something went wrong",
                        icon: "error",
                        theme: "dark",
                        useTransparency: true,
                        onOk: function () {

                        },

                    });
                }
            },
            onCancel: function () {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "You canceled delete request",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },

                });
            },

        })
    }
   
    return (
        <div class="content">

            <div class="d-flex justify-content-center" >
                <div class="spinner-border" role="status" style={{ width: "10rem", height: "10rem" }} hidden={loaderStatus}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>


            <div hidden={tebleStatus}>
                <h3 style={{ marginTop:"100px"}}>Students-DETAILS</h3><hr />

                <button type="button" class="btn btn-outline-info" id="pdfButton" onClick={(e) => { generatePDF(AllStudents) }}>
                    <i className="fa fa-file-pdf"></i>  PDF</button>
                
                    <form class="row g-3 needs-validation" id="inputForm2" novalidate>

                    <div class="col-md-6 position-relative">
                            <label for="validationTooltip01" class="form-label">TITLE</label>
                            <input type="text" class="form-control" id="validationTooltip01" required defaultValue={title}
                                onChange={(e) => { settitle(e.target.value) }} disabled={textState}/>
                        </div>
                        <div class="col-md-5 position-relative">
                            <label for="validationTooltip02" class="form-label">FULLNAME</label>
                            <input type="text" class="form-control" id="validationTooltip02" required defaultValue={fullname}
                                onChange={(e) => { setfullname(e.target.value) }} disabled={textState}/>
                        </div><br />
                        <div class="col-md-5 position-relative">
                            <label for="validationTooltip03" class="form-label">ITNUMBER</label>
                            <input type="text" class="form-control" id="validationTooltip03" required defaultValue={itnumber}
                                onChange={(e) => { setitnumber(e.target.value) }} disabled={textState}/>
                        </div>
                        <div class="col-md-4 position-relative">
                            <label for="validationTooltip03" class="form-label">NIC</label>
                            <input type="text" class="form-control" id="validationTooltip03" required defaultValue={nic}
                                onChange={(e) => { setnic(e.target.value) }} disabled={textState}/>
                        </div>
                        <div class="col-md-3 position-relative">
                            <label for="validationTooltip03" class="form-label">BIRTHDAY</label>
                            <input type="date" class="form-control" id="validationTooltip03" required defaultValue={birthday}
                                onChange={(e) => { setbirthday(e.target.value) }} disabled={textState}/>
                        </div>
                        <div class="col-md-3 position-relative">
                            <label for="validationTooltip03" class="form-label">CONTACTNUMBER</label>
                            <input type="text" class="form-control" id="validationTooltip03" required defaultValue={contactnumber}
                                onChange={(e) => { setcontactnumber(e.target.value) }} disabled={textState}/>
                        </div>
                        <div class="col-md-3 position-relative">
                            <label for="validationTooltip03" class="form-label">ADDRESS</label>
                            <input type="text" class="form-control" id="validationTooltip03" required defaultValue={address}
                                onChange={(e) => { setaddress(e.target.value) }} disabled={textState}/>
                        </div>
                        <div class="col-md-3 position-relative">
                            <label for="validationTooltip03" class="form-label">EMAIL</label>
                            <input type="text" class="form-control" id="validationTooltip03" required defaultValue={email}
                                onChange={(e) => { setemail(e.target.value) }} disabled={textState}/>
                        </div>
                              
                            <div class="col-md-3 position-relative">
                            <label for="validationTooltip03" class="form-label">BATCH</label>
                            <input type="text" class="form-control" id="validationTooltip03" required defaultValue={batch}
                                onChange={(e) => { setbatch(e.target.value) }} disabled={textState}/>
                        </div>

                                <div class="col-md-3 position-relative">
                            <label for="validationTooltip03" class="form-label">PASSWORD</label>
                            <input type="password" class="form-control" id="validationTooltip03" required defaultValue={password}
                                onChange={(e) => { setpassword(e.target.value) }} disabled={textState}/>
                        </div>

                        <div class="col-12" id="btngrp" hidden={btngrpState1} style={{marginTop:"5%"}}>
                                <button class="btn btn-secondary"><i class="fa fa-ban" onClick={(e) => { cancel(e) }}></i> CANCEL</button>&nbsp;&nbsp;&nbsp;
                                <button type="submit" class="btn btn-primary" onClick={(e) => { updateData(e) }}
                                    disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Updating...' : 'UPDATE'}</button>
                            </div>
                        <div class="col-12" id="btngrp" hidden={btngrpState2}  style={{marginTop:"5%"}}>
                            <button type="submit" class="btn btn-primary" onClick={(e) => { edit(e) }}> <i className="far fa-edit"></i> EDIT</button>&nbsp;&nbsp;&nbsp;
                            <button type="submit" class="btn btn-danger" onClick={(e) => { deleteStudent(e) }}><i class="fa fa-trash"></i>  DELETE</button>
                        </div>
                    </form>
            </div>

        </div>
    )
}
