import {Link} from 'react-router-dom';
import "../styles/Homepage.css"
import MainPage from '../assets/main-page.png';
import LoginPage from '../assets/login-page.png';
import maps from '../assets/maps.jpg'
import pins from '../assets/pins.jpg'

const HomePage = () => {
    return (
        <main className="homepage">
            <section className="image_wrapper" id="hero_section">
                <img alt="hero" loading="lazy" src={maps} id="hero_image"/>
                <section className="overlay" id="hero_content">
                    <div className="hero-text">
                        <h1>Experience the Freedom of Real-Time Tracking</h1>
                        <p>Discover the world with Location Tracker! Effortlessly navigate with confidence and unlock a
                            world of possibilities.</p>
                        <Link to="/signup" className="cta-button">Get Started</Link>
                    </div>
                </section>
            </section>

            <section className="features-section">
                <div className="container">
                    <h2>Key Features</h2>
                    <div className="feature-row">
                        <div className="feature-card">
                            <img src={LoginPage} alt="Login Page" loading="lazy"/>
                            <h3>Secure Authentication</h3>
                            <p>Ensure your privacy with robust authentication measures.</p>
                        </div>
                        <div className="feature-card">
                            <img src={pins} alt="Login Page" loading="lazy"/>
                            <i className="fas fa-map-marker-alt"></i>
                            <h3>Real-Time Location Tracking</h3>
                            <p>Pinpoint your current location with ease and precision.</p>
                        </div>
                        <div className="feature-card">
                            <img src={maps} alt="Login Page" loading="lazy"/>
                            <i className="fas fa-history"></i>
                            <h3>Location History</h3>
                            <p>Access your last five visited locations with a simple click.</p>
                        </div>
                        <div className="feature-card">
                            <img src={MainPage} alt="Main Page"/>
                            <h3>Enhanced Navigation</h3>
                            <p>Seamlessly zoom in and out for detailed exploration.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <div className="container">
                    <p>&copy; 2024 Location Tracker. All rights reserved.</p>
                    <nav>
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/login">Login</Link>
                    </nav>
                </div>
            </footer>
        </main>
    );
}

export default HomePage;
