import { useState } from "react";

export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`email is ${email}`)
        console.log(`password is ${password}`)
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
            <button type="submit">submit</button>
        </form>
    )
}