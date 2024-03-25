import {useState} from "react";
import {useAuthContext} from "./useAuthContext.js";
import apiService from '../services/api.service'

export const useLogin = () =>{
    const {dispatch} = useAuthContext()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const login = async (email, password) => {
        setError(null)
        setIsLoading(true)

        if (email === '' || password === '') {
            setError('All fields are required')
            setIsLoading(false)
            return
        }

       try {
            const response = await apiService.post('/auth/signin', {email, password})

            if (response.status !== 200) {
                setError(response.data.message || 'An error occurred. Please try again.')
                setIsLoading(false)
                return
            }

            // save user to local storage
            localStorage.setItem('userInfo', JSON.stringify(response.data))

            // update auth context
            dispatch({type: 'LOGIN', payload: response.data})
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)

            if (e.response && e.response.data) {
                setError(e.response.data.message || 'An error occurred. Please try again.')
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    }

    return {login, isLoading, error}
}
