import {createContext, useContext, useReducer, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import apiService from '../services/api.service'

export const AuthContext = createContext()

// const AuthProvider = ({children}) => {
//     const [userInfo, setUserInfo] = useState(null)
//     const [token, setToken] = useState(localStorage.getItem("siteT") || '')
//     // const navigate = useNavigate()
//
//     const loginAction = async (data) => {
//         try {
//             const response = apiService.post('/auth/signin', data)
//
//             if (response.status === 200) {
//                 setUserInfo(response.data?.user || 'Gabu')
//                 setToken(response.data.accessToken)
//                 localStorage.setItem("siteT", response.data.accessToken)
//                 // navigate("/")
//                 return true
//             }
//             throw new Error('response.data.message')
//         } catch (e) {
//             console.error(e);
//         }
//     }
//
//     const logOut = () => {
//         setUserInfo(null)
//         setToken("")
//         localStorage.removeItem("siteT")
//         // navigate('/login')
//         return true
//     }
//
//     return (
//         <AuthContext.Provider value={{userInfo, token, loginAction, logOut}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }
//
// export default AuthProvider
//
// export const useAuth = () => {
//     return useContext(AuthContext)
// }

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.accessToken
            }
        case "LOGOUT":
            return {
                ...state,
                user: null,
                token: ''
            }
        default:
            return state
    }
}
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        // token: localStorage.getItem("siteT") || ''
    })

    console.log('AuthContext State', state)

     return (
         <AuthContext.Provider value={{...state, dispatch}}>
             {children}
         </AuthContext.Provider>
     )
}
