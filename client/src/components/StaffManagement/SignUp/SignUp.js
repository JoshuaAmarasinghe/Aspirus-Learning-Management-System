import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from 'axios';
import './SignUp.css';

function SignUp() {
    const [title,setTitle] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [gender,setGender] = useState();
    const [phoneno,setPhoneno] = useState("");
    const [dob,setDob] = useState();
    const [nic,setNIC] = useState("");
    const [address,setAddress] = useState("");
    const [qualification,setQualification] = useState();
    const [role,setRole] = useState();
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState();
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false)
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState();

    function passwordOnFocus(){
        setShowMessage(true)
    }

    function passwordOnBlur(){
        setShowMessage(false)
    }

    //show hide password
    function handleShowPassword(){
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

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

    //header
    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

    //add new item
    async function register(event){
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

        if(password === confirmpassword){

            const newStaff = {title, name, email, phoneno, dob, nic, address, qualification, role, gender, password, imgUrl}

            try {
                await axios.post("http://localhost:8070/staff/signup", newStaff , config)
                    alert("Registration Successful")
                    navigate('/staff/signin')
            } catch (error) {
                    alert("Please check the details you entered")
            }
        }else{
            alert("Passwords don't match");
        }        
    }

    
    return (
            <div className="container" align="center">
                <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-11">
                        <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                            <h2>Sign Up</h2>
                        </div>
                    </div>
                </div>
                <div className="card-form">
                    <form onSubmit={register} className="boxSignUp">
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput
                                                type="text" id="title" placeholder="Title" 
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
                                                required fullWidth
                                                onChange={(event)=> {setName(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="date" id="dob" placeholder="Date"
                                                required fullWidth
                                                onChange={(event)=> {setDob(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-8 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput  
                                                type="email" id="email" placeholder="Email" 
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
                                                onChange={(event)=> {setPhoneno(event.target.value)}}
                                                inputProps={{style: {padding: 12}, pattern: "[0-9]{10}"}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="text" id="nic" placeholder="NIC" required fullWidth
                                                onChange={(event)=> {setNIC(event.target.value)}}
                                                inputProps={{style: {padding: 12}, pattern: '([0-9]{9}[x|X|v|V]|[0-9]{12})'}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="text" id="address" placeholder="Address" required fullWidth
                                                onChange={(event)=> {setAddress(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-group">
                                            <label>Gender</label> &nbsp;
                                            <div className="form-check form-check-inline">
                                                <input 
                                                    className="form-check-input" type="radio" name="gender" id="male" value="Male" required
                                                    onChange={(event)=> {setGender(event.target.value)}}
                                                />
                                                <label className="form-check-label" for="male">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input 
                                                    className="form-check-input" type="radio" name="gender" id="female" value="Female" required
                                                    onChange={(event)=> {setGender(event.target.value)}}
                                                />
                                                <label className="form-check-label" for="female">Female</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput
                                                type="text" id="qualification" placeholder="Qualification" 
                                                required fullWidth
                                                onChange={(event)=> {setQualification(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput  
                                                type="text" id="role" placeholder="Role" 
                                                required fullWidth
                                                onChange={(event)=> {setRole(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type={showPassword ? "text" : "password"}
                                                id="password" name="password" placeholder="Password" required fullWidth
                                                onChange={(event)=> {setPassword(event.target.value)}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                    <IconButton onClick={handleShowPassword}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{style: {padding: 12}, pattern: "[A-Za-z0-9]{8,}"}}
                                                onFocus={passwordOnFocus}
                                                onBlur={passwordOnBlur}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type={showPassword ? "text" : "password"}
                                                id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" required fullWidth
                                                onChange={(event)=> {setConfirmPassword(event.target.value)}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                    <IconButton onClick={handleShowPassword}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{style: {padding: 12}, pattern: "[A-Za-z0-9]{8,}"}}
                                                onFocus={passwordOnFocus}
                                                onBlur={passwordOnBlur}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 mb-4">
                                        {showMessage &&
                                            <div className="PWmessage">
                                                <p>Password must contain lowercase letters, uppercase letters, numbers and should consist minimum of 8 characters</p>
                                            </div>
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input id="terms" type="checkbox" required/>
                                            <label for="terms">&nbsp;I agree to the <Link to="/terms">Terms and Conditions</Link>.</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 d-flex justify-content-center">
                                <div>
                                    {previewSource ? 
                                        <img src={previewSource} alt="preview" className="previewImg"/>
                                    :
                                        <img src="/images/avatar.jpg" className="previewImg" alt="profile pic"/>
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
                                    <input className="form-submit-btn" type="submit" value="Sign Up" />
                                </div>
                            </div>
                        </div>
                        <p>Already have an account? <Link to="/staff/signin">Sign In</Link></p>
                    </form>             
                </div>                   
            </div>
    )
}

export default SignUp