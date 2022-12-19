import  { createContext, useReducer } from 'react'

// aim here is not to update database, but to keep local state
// in sync with database

// AuthContext is essentially a component with a Provider
// which will wrap the entire app, as in the return val of
// AuthoContextProvider
export const AuthContext = createContext()

// state here is the previous state
// the action is the object passed into dispatch
// state is then updated using the payload value from dispatch
// reducer therefore checks action type and updates state accordingly
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

// this is the actual component which wrapps <App> and allows
// all app components to access Authcontext, which in turn
// provides 'state' value to entire app to be consumed
export const AuthContextProvider = ({children}) => {
    // useReducer similar to useState, dispatch allows us to change state
    // dispatch takes an object which describes a state change. 
    // Second parameter is the information needed to make the change: 
    // dispatch({type: 'LOGIN, payload: [{}, {}]})
    // when dispatch is called, the reducer function is invoked, here: authReducer
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