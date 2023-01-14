import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {

    const navigate = useNavigate()

    // dispatch for auth needed to reset type
    // so app knows user has logged out
    const {dispatch} = useAuthContext()

    const logout = () => {
        // don't need to send anything to backend
        // remove 'user' - named user in initial creation of
        // localstorage item
        localStorage.removeItem('user')
        // do not need to set a payload here as the LOGOUT
        // case in the authReducer in AuthContext sets payload to null
        dispatch({type: 'LOGOUT'})

        navigate('/login')
    }

    return {logout}
}