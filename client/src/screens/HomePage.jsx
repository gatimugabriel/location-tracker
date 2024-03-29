import "../styles/Homepage.css"
import LoginPage from '../assets/login-page.png'; 
import MainPage from '../assets/main-page.png'; 
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="homepage">
            <div className="logo">
                LOGO

            </div>
            <div className="heading">
                <h2>Location Tracker</h2>
            </div>

            <div className="grid-body">
                <div className="row-1">
                    <div className="img-1">
                        <img src={LoginPage}/>

                    </div>
                    <div className="info-1">
                        <p>
                        Discover the world with Location Tracker! Experience the freedom of real-time tracking and effortless navigation. Whether you're planning your next adventure or simply exploring your neighborhood, our platform offers the tools you need to navigate with confidence. Join us now and unlock a world of possibilities!
                        </p>

                    </div>
                </div>
                <div className="row-2">
                    <div className="info-2">
                        <p>
                        <ul>
                        <li>Trace Your Location: Effortlessly pinpoint your current location in real-time.</li>
                        <li>Track Your History: Access your last five visited locations with ease.</li>
                        <li>Secure Authentication: Ensure your privacy with robust authentication measures.</li>
                        <li>Enhanced Navigation: Seamlessly zoom in and out for detailed exploration.</li>
                        </ul>
                        </p>

                    </div>
                    <div className="img-2">
                        <img src={MainPage}/>

                    </div>
                    </div>

            </div>
            
            <div className="login-part">
            <p>Click the captivating button below to witness the magic unfold.</p>
            <Link to="/signup"><button>Register</button></Link>
                
            </div>
        </div>
    );
}

