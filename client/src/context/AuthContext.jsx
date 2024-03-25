import {createContext, useState} from "react";
import apiService from '../services/api.service'

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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

            setUser(response.data)
            setIsLoading(false)
            return true
        } catch (e) {
            setIsLoading(false)

            if (e.response && e.response.data) {
                setError(e.response.data.message || 'An error occurred. Please try again.')
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    }

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
            setUser(response.data)
            setIsLoading(false)

            return true
        } catch (e) {
            setIsLoading(false)

            if (e.response && e.response.data) {
                setError(e.response.data.message || e.response.data.errors[0].msg || 'An error occurred. Please try again.')
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    }

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        isLoading,
        error,
        successMessage,
        login,
        signup,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

