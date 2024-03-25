import {Navigate, Outlet, useLocation} from "react-router-dom";
// import {useAuth} from "../../context/AuthContext.jsx";

export default function PrivateRoute() {
    const userInfo = ''
    const location = useLocation()

    return (
        userInfo?.token ? <Outlet/> :
            <Navigate to={"/Login"} state={{path: location.pathname}}/>
    )
}

