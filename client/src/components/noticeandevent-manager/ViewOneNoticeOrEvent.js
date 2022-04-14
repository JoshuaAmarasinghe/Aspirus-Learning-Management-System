import React, { useState, useEffect } from 'react'
import SoloAlert from 'soloalert'
import { useParams } from "react-router";
import axios from 'axios';
import jspdf from 'jspdf'
import "jspdf-autotable"


export default function ViewOneNoticeOrEvent() {

    const [isLoading, setLoading] = useState(false);

    const [textState, setTextState] = useState(true);
    const [btngrpState1, setBtnGroupstate1] = useState(true);
    const [btngrpState2, setBtnGroupstate2] = useState(false);



    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);

     
    const [date, setdate] = useState("");
    const [time, settime] = useState("");
    const [venue, setvenue] = useState("");
    const [to, setto] = useState("");
    const [createdby, setcreatedby] = useState("");
    const [category, setcategory] = useState("");
    const [topic, settopic] = useState("");
    const [content, setcontent] = useState("");


    const { id } = useParams();


    const [AllNoticesAndEvents, setAllNoticesAndEvents] = useState([]);
    //This useEffect function used to get all  data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:8070/noticeandeventManager/")).data.data
                setAllNoticesAndEvents(result);
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
        const tableColumn = ["date", "time", "venue","to","created by","category","topic","content"];
        const tableRows = [];

        tickets.slice(0).reverse().map(ticket => {
            const ticketData = [
                ticket.date,
                ticket.time,
                ticket.venue,
                ticket.to,
                ticket.createdby,
                ticket.category,
                ticket.topic,
                ticket.content
                
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
                const result = await (await axios.get(`http://localhost:8070/noticeandeventManager/${id}`)).data.data
                setdate(result[0].date);
                settime(result[0].time)
                setvenue(result[0].venue);
                setto(result[0].to)
                setcreatedby(result[0].createdby)
                setcategory(result[0].category);
                settopic(result[0].topic);
                setcontent(result[0].content)


                setLoaderStatus(true)
                setTableStatus(false)
                console.log(date,category)
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
                date,time,venue,to,createdby,category,topic,content
            }
            const data = await (await axios.put(`http://localhost:8070/noticeandeventManager/${id}`, newDetails)).status
            if (data === 200) {
                SoloAlert.alert({
                    title: "Welcome!",
                    body: "Details added successfully",
                    icon: "success",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {
                        window.location = "/noticeandeventManager/view"
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
    function deleteNoticeOrEvent(e) {
        e.preventDefault();

        SoloAlert.confirm({

            title: "Confirm Delete",
            body: "Are you sure",
            theme: "dark",
            useTransparency: true,
            onOk: async function () {

                try {
                    const result = await (await axios.delete(`http://localhost:8070/noticeandeventManager/${id}`)).status
                    console.log(result)

                    if (result === 200) {
                        SoloAlert.alert({
                            title: "Welcome!",
                            body: "Deletion is successful",
                            icon: "success",
                            theme: "dark",
                            useTransparency: true,
                            onOk: function () {
                                window.location = "/noticeandeventManager/view"
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
                <h3 style={{ marginTop:"100px"}}>CONTENT-DETAILS</h3><hr />

                <button type="button" class="btn btn-outline-info" id="pdfButton" onClick={(e) => { generatePDF(AllNoticesAndEvents) }}>
                    <i className="fa fa-file-pdf"></i>  PDF</button>
                
                    <form class="row g-3 needs-validation" id="inputForm2" novalidate>

                        <div class="col-md-6 position-relative">
                            <label for="validationTooltip01" class="form-label">DATE</label>
                            <input1 type="date" class="form-control" id="validationTooltip01" required defaultValue={date}
                                onChange={(e) => { setdate(e.target.value) }} disabled={textState}/>
                        </div>
                        <div class="col-md-5 position-relative">
                            <label for="validationTooltip02" class="form-label">TIME</label>
                            <input type="text" class="form-control" id="validationTooltip02" required defaultValue={time}
                                onChange={(e) => { settime(e.target.value) }} disabled={textState}/>
                        </div><br />
                        <div class="col-md-5 position-relative">
                            <label for="validationTooltip03" class="form-label">VENUE</label>
                            <input type="text" class="form-control" id="validationTooltip03" required defaultValue={venue}
                                onChange={(e) => { setvenue(e.target.value) }} disabled={textState}/>
                        </div>
                        <div class="col-md-4 position-relative">
                            <label for="validationTooltip03" class="form-label">TO</label>
                            <input type="text" class="form-control" id="validationTooltip03" required defaultValue={to}
                                onChange={(e) => { setto(e.target.value) }} disabled={textState}/>
                        </div>
                        <div class="col-md-3 position-relative">
                            <label for="validationTooltip03" class="form-label">CREATED BY</label>
                            <input type="text" class="form-control" id="validationTooltip03" required defaultValue={createdby}
                                onChange={(e) => { setcreatedby(e.target.value) }} disabled={textState}/>
                        </div>
                        <div class="col-md-4 position-relative">
                            <label for="validationTooltip03" class="form-label">CATEGORY</label>
                        </div>
                        <div class="col-md-4 position-relative">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Notice" required
                                    onChange={(e) => { setcategory(e.target.value) }} />
                            <label class="form-check-label" for="flexRadioDefault1"  > Notice </label>
                        </div>
                        <div class="col-md-4 position-relative">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Event" required
                                    onChange={(e) => { setcategory(e.target.value) }} />
                            <label class="form-check-label" for="flexRadioDefault2"  >Event </label>
                        </div>
                        <div class="col-md-3 position-relative">
                            <label for="validationTooltip03" class="form-label">TOPIC</label>
                            <input type="text" class="form-control" id="validationTooltip03" required defaultValue={topic}
                                onChange={(e) => { settopic(e.target.value) }} disabled={textState}/>
                        </div>
                        <div class="col-md-3 position-relative">
                            <label for="validationTooltip03" class="form-label">CONTENT</label>
                            <input type="text" class="form-control" id="validationTooltip03" required defaultValue={content}
                                onChange={(e) => { setcontent(e.target.value) }} disabled={textState}/>
                        </div>

                        <div class="col-12" id="btngrp" hidden={btngrpState1} style={{marginTop:"5%"}}>
                                <button class="btn btn-secondary"><i class="fa fa-ban" onClick={(e) => { cancel(e) }}></i> CANCEL</button>&nbsp;&nbsp;&nbsp;
                                <button type="submit" class="btn btn-primary" onClick={(e) => { updateData(e) }}
                                    disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Updating...' : 'UPDATE'}</button>
                            </div>
                        <div class="col-12" id="btngrp" hidden={btngrpState2}  style={{marginTop:"5%"}}>
                            <button type="submit" class="btn btn-primary" onClick={(e) => { edit(e) }}> <i className="far fa-edit"></i> EDIT</button>&nbsp;&nbsp;&nbsp;
                            <button type="submit" class="btn btn-danger" onClick={(e) => { deleteNoticeOrEvent(e) }}><i class="fa fa-trash"></i>  DELETE</button>
                        </div>
                    </form>
            </div>

        </div>
    )
}
