import { useState } from "react";
import { useRegister } from '../hooks/useRegister'
import { Link } from "react-router-dom"
import plusIcon from '../images/plus-icon.png'
import Nav from "../components/Nav";

export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [nationality, setNationality] = useState("")
    const [about, setAbout] = useState("")
    const [languages, setLanguages] = useState({language: "", level: "Native"})
    const {register, isLoading, error} = useRegister()

    console.log(languages)

    // async because needs to interact with backend
    const handleSubmit =  async(e) => {
        e.preventDefault();
        await register(email, password, name, age, nationality, about)
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
                    type='number' 
                    name='age'
                    min='16'
                    max='120'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}></input>
                </label>
                <label>
                    Nationality:
                    <input 
                    type='text' 
                    name='nationality'
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}>
                    </input>
                </label>
                <label className="languages-label">
                    Languages:
                    <div className="languages">
                        <input 
                        type='text' 
                        name='language'
                        value={languages.language}
                        onChange={(e) => setLanguages((languageObj) => ({...languageObj, language: e.target.value}))}
                        ></input>
                        <select 
                        className="language-dropdown"
                        type='text' 
                        name='level'
                        default='Native'
                        onChange={(e) => setLanguages((languageObj) => ({...languageObj, level: e.target.value}))}
                        >
                            <option value="Native">Native</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Beginner">Beginner</option>
                        </select>
                        {/* <button className="add-language-btn" type='button'><img src={plusIcon}></img></button> */}
                    </div>
                </label>
                <label className="about-label">
                    About:
                    <textarea value={about} onChange={(e) => setAbout(e.target.value)}/>
                </label>
                {/* prevent form from being submitted while register is happening: */}
                <button type="submit" disabled={isLoading} className="register-btn">register</button>
                {error && <div>{error}</div>}
                <p className="link-text"><Link to={'/login'}>Already have an account? Login</Link></p>
            </form>
            <div className="register-display-right"></div>
        </div>
    )
}