import {useContext} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";

export default function PrivateRoute() {
    const {user} = useContext(AuthContext)
    const location = useLocation()

    return (
        user? <Outlet/> :
            <Navigate to={"/Login"} state={{path: location.pathname}}/>
    )
}

