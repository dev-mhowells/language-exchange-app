import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from 'react-router-dom'

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login, error, isLoading} = useLogin()

    // async because needs to interact with backend
    const handleSubmit =  async(e) => {
        e.preventDefault();

        await login(email, password)
    }

    return(
        <div className="login-page">
            <form className="login-form" onSubmit={(e) => {handleSubmit(e)}}>
                <label>
                    email:
                    <input 
                    type='text' 
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></input>
                </label>
                <label>
                    password:
                    <input 
                    type='text' 
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                <button type="submit" disabled={isLoading}>log in</button>
                {error && <div>{error}</div>}
                <p className="link-text"><Link to={'/register'}>Don't have an account yet? Register here</Link></p>
            </form>
            <div className="login-display-right"></div>
        </div>
    )
}