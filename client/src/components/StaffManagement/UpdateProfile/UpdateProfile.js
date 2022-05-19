import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from 'axios';
import './UpdateProfile.css';

function UpdateProfile(props) {
    const [title,setTitle] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phoneno,setPhoneno] = useState("");
    const [nic,setNIC] = useState("");
    const [address,setAddress] = useState("");
    const [qualification,setQualification] = useState();
    const [role,setRole] = useState();
    const [userImg, setUserImg] = useState("");
    const { id } = useParams();
    const [staff,setStaff] = useState(JSON.parse(localStorage.getItem('user')));

    const navigate = useNavigate();
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState();

    //fetching user data
    useEffect(()=>{
        async function fetchUser(){
            await axios.get(`http://localhost:8070/staff/${encodeURIComponent(id)}`).then((res)=>{
                setTitle(res.data.result.title)
                setName(res.data.result.name)
                setEmail(res.data.result.email)
                setAddress(res.data.result.address)
                setPhoneno(res.data.result.phoneno)
                setNIC(res.data.result.nic)
                setQualification(res.data.result.qualification)
                setRole(res.data.result.role)
                setUserImg(res.data.result.imgUrl)
            }).catch((error)=>{
                alert("Failed to fetch user data")
            })
        }
        fetchUser()
    },[props]);

    //handling the image uploading
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(event.target.value);
    };


    //display a preview of uploaded image
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    //update the user
    async function Update(event){

        event.preventDefault();

        let imgUrl

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "staff_pictures")

            try {
                await axios.post("https://api.cloudinary.com/v1_1/aspiruslms/image/upload", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const updatedStaff = {title, name, email, phoneno, nic, address, qualification, role, imgUrl}

        //header with authorization token
        const config = {
            headers: {
                "content-Type": "application/json",
                Authorization: `${localStorage.getItem("staffAuthToken")}`,
            }
        };

        try {
            await axios.put(`http://localhost:8070/staff/update/${encodeURIComponent(id)}`,updatedStaff, config);
                alert("Updated Successfully")
                navigate('/staff/profile')
        } catch (error) {
            alert("Updating Failed")
            console.log(error)
        }    
    }

    return (
        <div className="container" align="center">
            <div className="row">
                <div className="col-1">
                </div>
                 <div className="col-11">
                    <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                        <h2>Update Profile</h2>
                    </div>
                </div>
            </div>
            <div className="">
                <form onSubmit={Update} encType="multipart/form-data" className="boxUpdate">
                <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput
                                                type="text" id="title" placeholder="Title" 
                                                value={title}
                                                required fullWidth
                                                onChange={(event)=> {setTitle(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput  
                                                type="text" id="name" placeholder="Name" 
                                                value={name}
                                                required fullWidth readOnly
                                                onChange={(event)=> {setName(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput  
                                                type="email" id="email" placeholder="Email" 
                                                value={email}
                                                required fullWidth
                                                onChange={(event)=> {setEmail(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="tel" id="phoneno" placeholder="phone" required fullWidth
                                                value={phoneno}
                                                onChange={(event)=> {setPhoneno(event.target.value)}}
                                                inputProps={{style: {padding: 12}, pattern: "[0-9]{10}"}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="text" id="nic" placeholder="NIC" required fullWidth
                                                value={nic}
                                                onChange={(event)=> {setNIC(event.target.value)}}
                                                inputProps={{style: {padding: 12}, pattern: '([0-9]{9}[x|X|v|V]|[0-9]{12})'}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="text" id="address" placeholder="Address" required fullWidth
                                                value={address}
                                                onChange={(event)=> {setAddress(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-7 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput
                                                type="text" id="qualification" placeholder="Qualification" 
                                                value={qualification}
                                                required fullWidth
                                                onChange={(event)=> {setQualification(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-5 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput  
                                                type="text" id="role" placeholder="Role" 
                                                value={role}
                                                required fullWidth
                                                onChange={(event)=> {setRole(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 d-flex justify-content-center">
                                <div>
                                    {previewSource ? 
                                        <img src={previewSource} alt="preview" className="previewImg"/>
                                    :
                                        <img src={`${staff.imgUrl}`} className="previewImg" alt="profile pic"/>
                                    }
                                    <div className="form-group">
                                        <label htmlFor="profilepic">
                                            <input
                                                style={{ display: 'none' }}
                                                id="profilepic"
                                                name="profilepic"
                                                type="file"
                                                onChange={handleFileInputChange}
                                                value={fileInputState}
                                            />

                                            <Button color="primary" variant="contained" component="span">
                                                <AddAPhotoIcon/> &nbsp; Upload Profile Picture
                                            </Button>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input className="form-submit-btn mb-0" type="submit" value="Update" />
                            </div> 
                        </div>
                    </div> 
                </form>     
            </div>                    
        </div>
    )
}

export default UpdateProfile