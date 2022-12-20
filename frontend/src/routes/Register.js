import { useState } from "react";
import { useRegister } from '../hooks/useRegister'
import Nav from "../components/Nav";

export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {register, isLoading, error} = useRegister()

    // async because needs to interact with backend
    const handleSubmit =  async(e) => {
        e.preventDefault();
        
        await register(email, password)
    }

    return(
        <div className="register-page">
            <Nav />
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
            {/* prevent form from being submitted while register is happening: */}
            <button type="submit" disabled={isLoading}>register</button>
            {error && <div>{error}</div>}
        </form>
        </div>
    )
}