import React, { useState } from "react";
import './Style.css';
import profile from '../images/profile.png';
import email from '../images/email.jpg';
import namee from '../images/name.png';
import password from '../images/pass.png';
import mobile from '../images/mobile.png';
import pic from '../images/pic.png';
import axios from "axios";
const Signup = () => {
    const [state, setState] = useState({
        photo: "",
        fullName: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: null
    });

    // const handleChange = (event) => {
    //     const { id, value } = event.target;
    //     setState((prevState) => ({
    //         ...prevState,
    //         [id]: value
    //     }));
    //     // setState(event.target.value);
    // };

    const handleSubmitClick = () => {
        // e.preventDefault();
        // if (state.fullName.length === 0) {
        //     alert("Name has left Blank!");
        // }
        // else if (state.mobile.length === 0) {
        //     alert("Mobile has left Blank!");
        // }
        // else if (state.email.length === 0) {
        //     alert("Email has left Blank!");
        // }
        // else{
        //     sendDetailsToServer();
        // }
        if (state.password === state.confirmPassword) {
            sendDetailsToServer();
            
        } else {
            alert("Passwords do not match");
        }
    };

    const sendDetailsToServer = () => {
        const url = 'http://localhost/signupReact/signup.php';
        let fData = new FormData();
        fData.append('fullName', state.fullName);
        fData.append('mobile', state.mobile);
        fData.append('email', state.email);
        fData.append('password', state.password);
        axios.post(url, fData).then(response => alert(response.data)).catch(error => alert(error));

    };
    return (
        <>
            <div className="big">
                <div className="container">
                    <div>
                        <div className="imgs">
                            <div className="container-image">
                                <img src={profile} alt="profile" className="profile" />
                            </div>        
                            <p className="uploadimg">Upload image</p>                  
                        </div>
                        
                        <form className="subContainer">
                            <label htmlFor="name">Full Name</label>
                            <div >
                                <img src={namee} alt="name" className="icon" />
                                <input type="text" id="name" value={state.fullName}
                                    onChange={(e) => setState((prevState) => ({
                                        ...prevState,
                                        fullName: e.target.value
                                      }))}></input>
                            </div>

                            <label htmlFor="name"> Mobile Number</label>
                            <div>
                                <img src={mobile} alt="email" className="icon" />
                                <input type="text" id="mobile" value={state.mobile}
                                    onChange={(e) => setState((prevState) => ({
                                        ...prevState,
                                        mobile: e.target.value
                                      }))}></input>
                            </div>

                            <label htmlFor="name"> Email</label>
                            <div>
                                <img src={email} alt="email" className="icon" />
                                <input type="text" id="email" value={state.email}
                                    onChange={(e) => setState((prevState) => ({
                                        ...prevState,
                                        email: e.target.value
                                      }))}></input>
                            </div>

                            <label htmlFor="name"> Password</label>
                            <div>
                                <img src={password} alt="email" className="icon" />
                                <input type="password" id="password" value={state.password}
                                    onChange={(e) => setState((prevState) => ({
                                        ...prevState,
                                        password: e.target.value
                                      }))}></input>
                            </div>

                            <label htmlFor="name"> Confirm Password</label>
                            <div>
                                <img src={password} alt="email" className="icon" />
                                <input type="password" id="confirmPassword" value={state.confirmPassword}
                                    onChange={(e) => setState((prevState) => ({
                                        ...prevState,
                                        confirmPassword: e.target.value
                                      }))}></input>
                            </div>

                            {/* <button type="submit" onClick={handleSubmitClick}>SIGNUP</button> */}
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmitClick}
                            > SIGN UP </button>
                        </form>
                        <p >
              Already have an account ?<a href="#" className="link">Login</a>
            </p>
                    </div>
                    <div className="pic">
                        <img src={pic} alt="pic" />
                    </div>
                </div>

            </div>
        </>
    );
};
export default Signup;