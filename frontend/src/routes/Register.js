import { useState } from "react";
import { useRegister } from '../hooks/useRegister'
import Nav from "../components/Nav";

export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [location, setLocation] = useState("")
    const [about, setAbout] = useState("")
    const {register, isLoading, error} = useRegister()

    // async because needs to interact with backend
    const handleSubmit =  async(e) => {
        e.preventDefault();
        console.log(email, password, name, age, location, about)
        await register(email, password, name, age, location, about)
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}></input>
                </label>
                <label>
                    Age:
                    <input 
                    type='text' 
                    name='age'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}></input>
                </label>
                <label>
                    Location:
                    <input 
                    type='text' 
                    name='location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}></input>
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
                    <textarea value={about} onChange={(e) => setAbout(e.target.value)}/>
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