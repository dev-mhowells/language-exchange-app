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
            <form onSubmit={(e) => {handleSubmit(e)}} className="register-form">
                <h2>Create account</h2>
                <label>
                    Email:
                    <input 
                    type='text' 
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></input>
                </label>
                <label>
                    Password:
                    <input 
                    type='text' 
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                <label>
                    Name:
                    <input 
                    type='text' 
                    name='name'
                    ></input>
                </label>
                <label>
                    Age:
                    <input 
                    type='text' 
                    name='age'
                    ></input>
                </label>
                <label>
                    Location:
                    <input 
                    type='text' 
                    name='location'
                    ></input>
                </label>
                <label className="languages-label">
                    Languages:
                    <div className="languages">
                        <input 
                        type='text' 
                        name='lanaguage'
                        ></input>
                        <input 
                        type='text' 
                        name='level'
                        ></input>
                    </div>
                </label>
                <label className="about-label">
                    About:
                    <textarea />
                </label>
                {/* prevent form from being submitted while register is happening: */}
                <button type="submit" disabled={isLoading} className="register-btn">register</button>
                {error && <div>{error}</div>}
                <p className="link-text">Already have an account? Login</p>
            </form>
            <div className="register-display-right"></div>
        </div>
    )
}