import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import "leaflet/dist/leaflet.css"; // <- Leaflet styles
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import ErrorComponent from "./components/shared/ErrorComponent.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";
import {AuthContextProvider} from "./context/AuthContext.jsx";

// --- screens --- //
import HomePage from "./screens/HomePage.jsx";
import Signup from './screens/Signup.jsx';
import Login from "./screens/Login.jsx";

// private
import Dashboard from './screens/Dashboard.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App/>}>
            {/* public pages */}
            <Route index={true} path="/" element={<HomePage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>

            {/* private pages */}
            <Route element={<PrivateRoute/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>

            {/*  Not Found Page */}
            <Route path="*" element={<ErrorComponent
                title={'Page Not Found'}
                description={'Sorry, the page you are looking for cannot be found!\n'}/>}
            />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router}/>
        </AuthContextProvider>
    </React.StrictMode>,
)
