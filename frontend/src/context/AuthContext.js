import  { createContext, useReducer } from 'react'

// AuthoContext is essentially a component with a Provider
// which will wrap the entire app, as in the return val of
// AuthoContextProvider
export const AuthContext = createContext()

// state here is the previous state
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            // return original state if no changes
            return state
    }
}

// this is the actual component which wrapps <App> and uses
// Authcontext above to provide 'state' value to entire app
export const AuthContextProvider = ({children}) => {
    // second parameter of useReducer is initial state
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    console.log('Authocontext state:', state)

    // pass value as props, spread in state to access all values
    // inside state object above
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}