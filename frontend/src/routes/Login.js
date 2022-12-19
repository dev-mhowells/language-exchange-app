import { useState } from "react";

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // async because needs to interact with backend
    const handleSubmit =  async(e) => {
        e.preventDefault();
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
            <button type="submit">log in</button>
        </form>
    )
}