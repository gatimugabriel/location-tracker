import {useState} from "react";
import {useAuthContext} from "./useAuthContext.js";
import apiService from '../services/api.service'

export const useSignup = () => {
    const {dispatch} = useAuthContext()

    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [error, setError] = useState(null)

    const signup = async (email, password, confirmPassword) => {
        setSuccessMessage('')
        setError(null)
        setIsLoading(true)

        if (email === '' || password === '' || confirmPassword === '') {
            setError('All fields are required')
            setIsLoading(false)
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setIsLoading(false)
            return
        }

        try {
            const response = await apiService.post('/auth/signup', {email, password, confirmPassword})

            if (response.status !== 201) {
                setError(response.data.message || response.data.errors[0].msg || 'An error occurred. Please try again.')
                setIsLoading(false)
                return
            }
            setSuccessMessage(response.data.message)

            // save user to local storage
            localStorage.setItem('userInfo', JSON.stringify(response.data))

            // update auth context
            dispatch({type: 'LOGIN', payload: response.data})
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)

            if (e.response && e.response.data) {
                setError(e.response.data.message || e.response.data.errors[0].msg || 'An error occurred. Please try again.')
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    }

    return {signup, isLoading, successMessage, error}
}
