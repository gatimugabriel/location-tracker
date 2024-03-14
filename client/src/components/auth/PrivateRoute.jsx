import useAuth from "../../hooks/useAuth.js";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export default function PrivateRoute() {
    const {userInfo} = useAuth()
    const location = useLocation()

    return (
        userInfo ? <Outlet/> :
            <Navigate to={"/Login"} state={{path: location.pathname}}/>
    )

}

