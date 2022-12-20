import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

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
        <form onSubmit={(e) => {handleSubmit(e)}}>
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
        </form>
    )
}