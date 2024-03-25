import LoginImage from '../assets/Login-img.png';
import "../styles/Login.css";
import {Link, useNavigate} from 'react-router-dom';
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

function Signup() {
    const {signup, isLoading, error, successMessage} = useContext(AuthContext)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (await signup(formData.email, formData.password, formData.confirmPassword)) {
            navigate('/dashboard')
        }
    };

    return (
        <div className="Login-page">
            <div className="img-sec">
                <img src={LoginImage} alt="login image" loading="lazy"></img>
            </div>

            <div className="input-sec">
                <div className="input-body">
                    <h2>Welcome back</h2>
                    <p className="subtitle">Lets start tracking</p>

                    {successMessage && <p className="success">{successMessage}</p>}
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="inputs">
                            <input
                                className="input-field"
                                placeholder="Your Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <input
                                className="input-field"
                                id="input1"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <input
                                className="input-field"
                                id="input1"
                                placeholder="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />

                            {isLoading ? <button type="button" className="login-btn">please wait...</button>
                                :
                                <button type="submit" className="login-btn">Register</button>
                            }
                        </div>
                    </form>

                    {/*<p className="forgotpwd"> Forgot password?</p>*/}

                    <div className="new-ac">
                        <p>Already have an Account? <Link to="/login"><span id="gotoregister">Login</span></Link></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup;
