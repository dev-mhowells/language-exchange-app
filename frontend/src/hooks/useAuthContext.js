import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react'

export const useAuthContext = () => {
    // consumes context
    // this hook returns the value of the context i.e. the
    // value passed into AuthContext.Provider - {state, dispatch}
    const context = useContext(AuthContext)

    // just checks that we are in the scope of the component that
    // AuthContextProvider is wrapped in
    if(!context) {
        throw Error('useAuthContext must be used inside AuthContextProvider')
    }

    return context
}

// HOW TO USE:
// const {user, dispatch} = useAuthContext()
// dispatch({type: 'LOGIN', payload: 'some data})