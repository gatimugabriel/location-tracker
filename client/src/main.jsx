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
import HomePage from "./screens/HomePage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>

            {/* public pages */}
            <Route path="/auth" element={<SignUpIn/>}/>

            {/* private pages */}
            <Route element={<PrivateRoute/>}>
                <Route index={true} path="/" element={<HomePage/>}/>
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
