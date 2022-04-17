import React, { useState, useEffect } from 'react'
import SoloAlert from 'soloalert'
import { useParams } from "react-router";
import axios from 'axios';


export default function ViewOneContent() {

    const [isLoading, setLoading] = useState(false);

    const [textState, setTextState] = useState(true);
    const [btngrpState1, setBtnGroupstate1] = useState(true);
    const [btngrpState2, setBtnGroupstate2] = useState(false);



    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);



    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    

    const { id } = useParams();

    //This useEffect function used to get all Notices and Events data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get(`http://localhost:8070/content/${id}`)).data.data
                setTitle(result[0].title);
                setdescription(result[0].description)
                


                setLoaderStatus(true)
                setTableStatus(false)
                console.log(title,description)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    }, [])


    async function updateContent(e) {

        try {
            e.preventDefault();
            const newDetails = {
                title,description
            }
            const data = await (await axios.put(`http://localhost:8070/content/${id}`, newDetails)).status
            if (data === 200) {
                SoloAlert.alert({
                    title: "Welcome!",
                    body: "Details added successfully",
                    icon: "success",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {
                        window.location = "/content/view"
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
    function deleteContent(e) {
        e.preventDefault();

        SoloAlert.confirm({

            title: "Confirm Delete",
            body: "Are you sure",
            theme: "dark",
            useTransparency: true,
            onOk: async function () {

                try {
                    const result = (await axios.delete(`http://localhost:8070/content/${id}`)).status
                    console.log(result)

                    if (result === 200) {
                        SoloAlert.alert({
                            title: "Welcome!",
                            body: "Deletion is successful",
                            icon: "success",
                            theme: "dark",
                            useTransparency: true,
                            onOk: function () {
                                window.location = "/content/view"
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
                <h3 style={{ marginTop:"100px"}}>COURSE-DETAILS</h3><hr />
                    <form class="row g-3 needs-validation" id="inputForm2" noValidate>

                        <div class="col-md-6 position-relative">
                            <label for="validationTooltip01" class="form-label">title</label>
                            <input type="text" class="form-control" id="validationTooltip01" required defaultValue={title}
                                onChange={(e) => { setTitle(e.target.value) }} disabled={textState}/>
                        </div>
                        <div class="col-md-5 position-relative">
                            <label for="validationTooltip02" class="form-label">Description</label>
                            <input type="text" class="form-control" id="validationTooltip02" required defaultValue={description}
                                onChange={(e) => { setdescription(e.target.value) }} disabled={textState}/>
                        </div><br />
                        

                        <div class="col-12" id="btngrp" hidden={btngrpState1} style={{marginTop:"5%"}}>
                                <button class="btn btn-secondary"><i class="fa fa-ban" onClick={(e) => { cancel(e) }}></i> CANCEL</button>&nbsp;&nbsp;&nbsp;
                                <button type="submit" class="btn btn-primary" onClick={(e) => { updateContent(e) }}
                                    disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Updating...' : 'UPDATE'}</button>
                            </div>
                        <div class="col-12" id="btngrp" hidden={btngrpState2}  style={{marginTop:"5%"}}>
                            <button type="submit" class="btn btn-primary" onClick={(e) => { edit(e) }}> <i className="far fa-edit"></i> EDIT</button>&nbsp;&nbsp;&nbsp;
                            <button type="submit" class="btn btn-danger" onClick={(e) => { deleteContent(e) }}><i class="fa fa-trash"></i>  DELETE</button>
                        </div>
                    </form>
            </div>

        </div>
    )
}
