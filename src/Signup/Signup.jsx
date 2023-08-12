import React, { useRef, useState } from "react";
import './Style.css';
import profile from '../images/profile.png';
import pic from '../images/pic.png';
import axios from "axios";
import * as Yup from 'yup';

const Signup = () => {
    const [state, setState] = useState({
        // photo: "",
        fullName: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: null
    });
    const [photo, setPhoto] = useState("");
    const [emailExistsError, setEmailExistsError] = useState(false);

    const inputRef = useRef(null);
    const handleImageClick = () => {
        inputRef.current.click();
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setPhoto(e.target.files[0]);
        console.log(photo);

    };
    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('Name is required'),
        mobile: Yup.string()
            .matches(/^[0-9]{11}$/, 'Invalid mobile number')
            .required(' Mobile number is required')
        ,
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email address'),
        password: Yup.string()
            .min(8, 'Must be at least 8 characters long')
            .matches(
                /(?=.*?[A-Z])/,
                'Must have at least one uppercase letter',
            )
            .matches(
                /(?=.*?[a-z])/,
                'Must have at least one lowercase letter',
            )
            .matches(
                /(?=.*?[0-9])/,
                'Must have at least one digit',
            )
            .matches(
                /(?=.*?[#?!@$%^&*-_])/,
                'Must have at least one special character (!@#$%^&*)',
            )
            .required('password is required'),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Your passwords do not match')
            .required('Confirm password is required'),
    });


    const handleSubmitClick = (e) => {
        e.preventDefault();
        validationSchema
            .validate(state, { abortEarly: false })
            .then(() => {
                sendDetailsToServer();
                // checkEmailExists();
            })
            .catch((errors) => {
                const validationErrors = {};
                errors.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                setState((prevState) => ({
                    ...prevState,
                    errors: validationErrors,
                }));
            });
    };

    const checkEmailExists = () => {
        const url = 'http://localhost/form-xlab/signup.php';
        const email = state.email;
        axios.post(url, { email })
            .then((response) => {
                if (response.data.message === "Email already exists") {
                    setEmailExistsError(true);
                } else {
                    sendDetailsToServer();
                }
            })
            .catch((error) => {
                alert('Error checking email existence');
                console.log(error);
            });
    }
    const sendDetailsToServer = () => {
        // setEmailExistsError(false);
        const url = 'http://localhost/form-xlab/signup.php';
        let fData = new FormData();
        fData.append('fullName', state.fullName);
        fData.append('mobile', state.mobile);
        fData.append('email', state.email);
        fData.append('password', state.password);
        const imagePath = `images/${photo.name}`;
        fData.append('imagePath', imagePath);

        axios.post(url, fData).then(
            response => {
                alert(response.data);

            }
        ).catch(error => alert(error));

        setState((prevState) => ({
            ...prevState,
            successMessage: "Signup successfull !"
        }));

        // Refresh the page after a delay
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };
    return (
        <>
            <div className="big">
                <div className="container">
                    <div>
                        <div className="imgs" onClick={handleImageClick}>
                            <div className="container-image" >
                                {photo ? (<img src={URL.createObjectURL(photo)} alt="profile" className="profile" />
                                ) : (<img src={profile} alt="profile" className="profile" />)}
                            </div>
                            <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} />
                            <p className="uploadimg">Upload image</p>
                        </div>

                        <form className="subContainer">

                            <label htmlFor="name">Full Name <span className="required">*</span> </label>
                            <div >
                                <div className="icon">
                                    <span class="material-icons-outlined">person</span>
                                </div>
                                <input type="text" id="name" value={state.fullName}
                                    onChange={(e) => setState((prevState) => ({
                                        ...prevState,
                                        fullName: e.target.value
                                    }))} />
                                {state.errors && state.errors.fullName && (
                                    <p className="error">{state.errors.fullName}</p>
                                )}
                            </div>

                            <label htmlFor="name"> Mobile Number <span className="required">*</span> </label>
                            <div>
                                <div className="icon">
                                    <span class="material-icons-outlined">call</span>
                                </div>
                                <input type="text" id="mobile" value={state.mobile}
                                    onChange={(e) => setState((prevState) => ({
                                        ...prevState,
                                        mobile: e.target.value
                                    }))} />
                                {state.errors && state.errors.mobile && (
                                    <p className="error">{state.errors.mobile}</p>
                                )}
                            </div>

                            <label htmlFor="name"> Email <span className="required">*</span></label>
                            <div>
                                <div className="icon">
                                    <span class="material-icons-outlined">email</span>
                                </div>
                                <input type="text" id="email" value={state.email}
                                    onChange={(e) => setState((prevState) => ({
                                        ...prevState,
                                        email: e.target.value
                                    }))} />
                                {state.errors && state.errors.email && (
                                    <p className="error">{state.errors.email}</p>
                                )}
                                {emailExistsError && (
                                    <p className="error">Email already exists</p>
                                )}
                            </div>

                            <label htmlFor="name"> Password <span className="required">*</span></label>
                            <div>
                                <div className="icon">
                                    <span class="material-icons-outlined" >lock</span>
                                </div>
                                <input type="password" id="password" value={state.password}
                                    onChange={(e) => setState((prevState) => ({
                                        ...prevState,
                                        password: e.target.value
                                    }))} />
                                {state.errors && state.errors.password && (
                                    <p className="error">{state.errors.password}</p>
                                )}
                            </div>

                            <label htmlFor="name"> Confirm Password <span className="required">*</span></label>
                            <div>
                                <div className="icon">
                                    <span class="material-icons-outlined">lock</span>
                                </div>
                                <input type="password" id="confirmPassword" value={state.confirmPassword}
                                    onChange={(e) => setState((prevState) => ({
                                        ...prevState,
                                        confirmPassword: e.target.value
                                    }))} />
                                {state.errors && state.errors.confirmPassword && (
                                    <p className="error">{state.errors.confirmPassword}</p>
                                )}
                            </div>

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