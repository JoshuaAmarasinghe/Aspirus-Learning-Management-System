import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert'
import axios from 'axios';
import validation from 'validator'



export default function AddNoticeOrEvent() {

    const [isLoading, setLoading] = useState(false);

    const [date, setdate] = useState("");
    const [time, settime] = useState("");
    const [venue, setvenue] = useState("");
    const [to, setto] = useState("");
    const [createdby, setcreatedby] = useState("");
    const [category, setcategory] = useState("");
    const [topic, settopic] = useState("");
    const [content, setcontent] = useState("");

   async function submitData(e) {
    setLoading(true)
        try {
            e.preventDefault();
            if (!date || !time ||!venue || !to || !createdby || !category || !topic || !content ) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please fill all fields",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }else if (!validation.isDate(date)) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please enter valid date",
                    icon: "error",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }else {
                const newDetails = {
                    date,time,venue,to,createdby,category,topic,content

                }
                const data = await (await axios.post("http://localhost:8070/noticeandeventManager/", newDetails)).status
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
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3">
                        <h2 >Add Details </h2>
                    </div>
                </div>
            </div>
           <br></br>
            <form class="row g-3 needs-validation" id="inputForm2" novalidate>

                <div class="col-md-3 position-relative">
                    <label for="validationTooltip03" class="form-label">DATE</label>
                    <input type="date" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setdate(e.target.value) }} />
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip03" class="form-label">TIME</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { settime(e.target.value) }} />
                </div>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">VENUE</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setvenue(e.target.value) }} />
                </div>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip02" class="form-label">TO</label>
                    <input type="text" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setto(e.target.value) }} />
                </div><br />
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">CREATED BY</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setcreatedby(e.target.value) }} />
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
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { settopic(e.target.value) }} />
                </div>
                <div class="col-md-7 position-relative">
                    <label for="validationTooltip03" class="form-label">CONTENT</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setcontent(e.target.value) }} />
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
