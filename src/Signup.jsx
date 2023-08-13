import React, { useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import profile from './images/profile.png';
import pic from './images/pic.png';
import axios from "axios";
import * as Yup from 'yup';

const Signup = () => {
    const [state, setState] = useState({
        fullName: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: null
    });
    const [photo, setPhoto] = useState("");

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


    const sendDetailsToServer = () => {
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
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="imgs" onClick={handleImageClick}>
                            <div className="container-image" >
                                {photo ? (<img src={URL.createObjectURL(photo)} alt="profile" className="profile" />
                                ) : (<img src={profile} alt="profile" className="profile" />)}
                            </div>
                            <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} />
                            <p className="colorOrange">Upload image</p>
                        </div>

                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Full Name <span className="text-danger">*</span> </label>
                                <div className="input-group">
                                    <div className="input-group-prepend icon">
                                        <span className="input-group-text ">
                                            <span class="material-icons-outlined">person</span>
                                        </span>
                                    </div>
                                    <input type="text" id="name" 
                                        className={`form-control ${state.errors && state.errors.fullName ? 'is-invalid' : ''}`} 
                                        value={state.fullName}
                                        onChange={(e) => setState((prevState) => ({
                                            ...prevState,
                                            fullName: e.target.value
                                        }))} />
                                    {state.errors && state.errors.fullName && (
                                        <div className="invalid-feedback">{state.errors.fullName}</div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name"> Mobile Number <span className="text-danger">*</span> </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <span class="material-icons-outlined">call</span>
                                        </span>
                                    </div>
                                    <input type="text" id="mobile" 
                                        className={`form-control ${state.errors && state.errors.mobile ? 'is-invalid' : ''}`} 
                                        value={state.mobile}
                                        onChange={(e) => setState((prevState) => ({
                                            ...prevState,
                                            mobile: e.target.value
                                        }))} />
                                    {state.errors && state.errors.mobile && (
                                        <div className="invalid-feedback">{state.errors.mobile}</div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name"> Email <span className="text-danger">*</span></label>
                                <div className="input-group" >
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <span class="material-icons-outlined">email</span>
                                        </span>
                                    </div>
                                    <input type="text" id="email" 
                                        className={`form-control ${state.errors && state.errors.email ? 'is-invalid' : ''}`} 
                                        value={state.email}
                                        onChange={(e) => setState((prevState) => ({
                                            ...prevState,
                                            email: e.target.value
                                        }))} />
                                    {state.errors && state.errors.email && (
                                        <div className="invalid-feedback">{state.errors.email}</div>
                                    )}
                                    {/* {emailExistsError && (
                                        <div className="invalid-feedback">Email already exists</div>
                                    )} */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name"> Password <span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <span class="material-icons-outlined" >lock</span>
                                        </span>
                                    </div>
                                    <input type="password" id="password" 
                                        className={`form-control ${state.errors && state.errors.password ? 'is-invalid' : ''}`}
                                        value={state.password}
                                        onChange={(e) => setState((prevState) => ({
                                            ...prevState,
                                            password: e.target.value
                                        }))} />
                                    {state.errors && state.errors.password && (
                                        <div className="invalid-feedback">{state.errors.password}</div>
                                    )}
                                </div>
                                </div>
                            <div className="form-group">
                                <label htmlFor="name"> Confirm Password <span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <span class="material-icons-outlined">lock</span>
                                        </span>
                                    </div>
                                    <input type="password" id="confirmPassword" 
                                        className={`form-control ${state.errors && state.errors.confirmPassword ? 'is-invalid' : ''}`}
                                        value={state.confirmPassword}
                                        onChange={(e) => setState((prevState) => ({
                                            ...prevState,
                                            confirmPassword: e.target.value
                                        }))} />
                                    {state.errors && state.errors.confirmPassword && (
                                        <div className="invalid-feedback">{state.errors.confirmPassword}</div>
                                    )}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary" 
                                style={{ marginTop: '10px' }}
                                onClick={handleSubmitClick}
                            > SIGN UP </button>

                        </form>
                        <p >
                            Already have an account ?<a href="login" className="colorOrange">Login</a>
                        </p>
                    </div>
                    <div className="col-md-6">
                        <div className="pic">
                            <img src={pic} alt="pic" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Signup;