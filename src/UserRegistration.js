import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import './Login.css';
import Register from "./images/register.jpg";
import './Adminicon.css'

export default function UserRegistration() {
    let navigate = useNavigate();
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('')
    const [UserName, setUserName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [CPassword, setCPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [Allok, setAllok] = useState(false);

    const [isSubmit, setIsSubmit] = useState(false);

    const validate = (out) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        setAllok(true);
        console.log(Allok);
        if (!out.FirstName) {
            errors.firstname = "Name is required!";
            setAllok(false);
        }
        if (!out.LastName) {
            errors.lastname = "Name is required!";
            setAllok(false);
        }
        if (!out.PhoneNumber) {
            errors.phonenumber = "phonenumber is required!";
            setAllok(false);
        }
        if (!out.UserName) {
            errors.username = "Username is required!";
            setAllok(false);
        }
        if (!out.Email) {
            errors.email = "Email is required!";
            setAllok(false);
        } else if (!regex.test(out.Email)) {
            errors.email = "This is not a valid email format!";
            setAllok(false);
        }
        if (!out.Password) {
            errors.password = "Password is required";
            setAllok(false);
        } else if (out.Password.length < 4) {
            errors.password = "Password must be more than 4 characters";
            setAllok(false);
        } else if (out.Password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
            setAllok(false);
        }
        if (!CPassword.length) {
            errors.cpassword = "Confirm Password is required";
            setAllok(false);
        } else if (out.Password !== CPassword) {
            errors.cpassword = "Password Doesn't match";
            setAllok(false);
        }
        return errors;
    };

    async function Submit(e) {
        e.preventDefault();
        console.log(Allok);
        const out = {
            "FirstName": FirstName,
            "LastName": LastName,
            "PhoneNumber":PhoneNumber,
            "UserName": UserName,
            "Email": Email,
            "Password": Password
        };
        setFormErrors(validate(out));
        console.log(Allok);
        console.log(formErrors)
        console.log(out);

        if (Allok) {
            axios.post('https://localhost:7281/api/UserRegistration', out)
                .then(function (response) {
                    console.log(response.data);
                    console.log(response.status);
                    setIsSubmit(true);
                })
                .catch(function (error) {
                    console.log(error);
                    if (error.request.status === 500) {
                        alert("Username already exist")
                    } else {
                        alert(error.message)
                    }
                });
        }
    }
    return (
        <>
            <div className='Login'>
                {Allok && isSubmit ? (
                <><form ><div >Registration successfull<br/>Login Again</div><button onClick={() => navigate('/')}>Ok</button></form>
                    </>
            ) : (<>
            <form className="Userform">
            <div><img className="reg" src ={Register} alt="admin" /></div>
                    <h2>USER REGISTRATION</h2>
                    <div >
                        <label>First Name</label>
                        {<label className="labelalert">{formErrors.firstname}</label>}
                    </div>
                    <input required type="text" placeholder="First Name" onChange={event => setFirstName(event.target.value)}></input>

                    <div >
                        <label>Last Name</label>
                        {<label className="labelalert">{formErrors.lastname}</label>}
                    </div>
                    <input required type="text" placeholder="Last Name" onChange={event => setLastName(event.target.value)}></input>

                    <div >
                        <label>Phone Number</label>
                        {<label className="labelalert">{formErrors.phonenumber}</label>}
                    </div>
                    <input required type="text" placeholder="Phone number" onChange={event => setPhoneNumber(event.target.value)}></input>


                    <div >
                        <label>Username</label>
                        {<label className="labelalert">{formErrors.username}</label>}
                    </div>
                    <input required type="text" placeholder="Username" onChange={event => setUserName(event.target.value)}></input>

                    <div >
                        <label>Email</label>
                        {<label className="labelalert">{formErrors.email}</label>}
                    </div>


                    <input required type="text" placeholder="Email" onChange={event => setEmail(event.target.value)}></input>
                    <div >
                        <label>Password</label>
                        {<label className="labelalert">{formErrors.password}</label>}
                    </div>
                    <input required type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}></input>

                    <div >
                        <label>Confirm Password</label>
                        {<label className="labelalert">{formErrors.cpassword}</label>}
                    </div>
                    <input required type="password" placeholder="Confirm Password" onChange={event => setCPassword(event.target.value)}></input>


                    <button className="btn" onClick={(e) => Submit(e)}>Register</button>
                    <br />
                    <NavLink className="p1" to="/Userlogin"><b>Already have account</b></NavLink>
                    </form>
                    </>)}
            </div>


        </>
    );
}