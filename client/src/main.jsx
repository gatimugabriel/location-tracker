import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import ErrorComponent from "./components/shared/error/ErrorComponent.jsx";

// --- screens --- //
// auth
import SignUpIn from "./screens/auth/SignUpIn.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";
// private
// import HomePage from "./screens/HomePage.jsx";
import Dashboard from './components/Dashboard.jsx';
import Login from  "./components/Login.jsx";
import "./index.css";
// import App from "./App";
import "leaflet/dist/leaflet.css"; // <- Leaflet styles
import Signup from './components/Signup.jsx';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>

            {/* public pages */}
            <Route path="/auth" element={<SignUpIn/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />




            {/* private pages */}
            <Route element={<PrivateRoute/>}>
            {/* <Route index={true} path="/" element={<Dashboard/>}/> */}
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
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
