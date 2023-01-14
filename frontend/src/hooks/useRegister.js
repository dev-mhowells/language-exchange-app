import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()

    // to be used on the submit of register form
    // email and password params will come straight from user input
    const register = async (email, password, name, age, nationality, languages, about) => {
        setIsLoading(true)
        // resets error every call
        setError(null)

        // need to pass in options because POST req
        // fetch address does not need to match react routing!
        const response = await fetch('/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            // pass in the email password object in JSON format
            // this will be the req.body of user_controller.registerUser
            // registerUser() in userController then responds with {email, token}
            body: JSON.stringify({email, password, name, age, nationality, languages, about})
        })
        // this will either return json with token or err msg
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok) {
            // save user to local storage (json web token and email)
            // have to restringify the json because it needs to be stored
            // as a string in local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context so that entire app knows user is logged in
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)

            navigate('/profile')
        }
    }
    return {register, isLoading, error}
} 