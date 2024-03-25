import {useContext, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';

import "../styles/Login.css";
import LoginImage from '../assets/Login-img.png';
import {AuthContext} from "../context/AuthContext.jsx";


function Login() {
    const {login, error, isLoading} = useContext(AuthContext)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

        if (await login(formData.email, formData.password)){
            navigate('/dashboard')
        }
    }

    return (
        <div className="Login-page">
            <div className="img-sec">
                <img src={LoginImage} alt="tracking_image" className="image" loading="lazy"></img>
            </div>

            <div className="input-sec">
                <div className="input-body">
                    <h2>Welcome back</h2>
                    <p className="subtitle">Lets start tracking</p>

                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="inputs">
                            <input
                                className="input-field"
                                placeholder="Your Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <input
                                className="input-field"
                                id="input1"
                                placeholder="Your Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />

                            {isLoading ? <button type="button" className="login-btn">please wait...</button>
                                :
                                <button type="submit" className="login-btn">Login</button>
                            }

                            {/*<button type="submit" className="login-btn">Login</button>*/}

                        </div>
                    </form>

                    {/*<p className="forgotpwd"> Forgot password?</p>*/}

                    <div className="new-ac">
                        <p>Don’t Have an Account? <Link to="/signup"><span id="gotoregister">Register</span></Link></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;
