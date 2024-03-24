import React from "react";
import LoginImage from '../assets/Login-img.png'; 
import "../styles/Login.css";
import { Link } from 'react-router-dom';



function Login(){
    return(
        <div className="Login-page">
            <div className="img-sec">
                <img src={LoginImage} alt="tracking_image" className="image"></img>
            </div>

            <div className="input-sec">
                <div className="input-body">
                    <h2>Welcome back</h2>
                    <p className="subtitle">Lets start tracking</p>
                    <div className="inputs">
                    <input  className="input-field" placeholder="Your Email"></input>
                    <input className="input-field" id="input1" placeholder="Your Password"></input>
                    </div>
                    <p className="forgotpwd"> Forgot password?</p>
                    <div className="login-btn">
                    <Link to="/dashboard"><button>Login</button></Link>
                    </div>
                    <div className="new-ac" >
                        <p>Don’t Have an Account? <Link to="/signup"><span id="gotoregister">Register</span></Link> </p>
                    </div>

                </div>
            </div>   
        </div>
    )
}

export default Login;
