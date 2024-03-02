const useAuth = () => {
    const userInfo = localStorage.getItem('userInfo')

    const getUserInfo = () => {
        if (userInfo) return userInfo
        return null
    }

    return {userInfo: getUserInfo()}
}

export default useAuth;
