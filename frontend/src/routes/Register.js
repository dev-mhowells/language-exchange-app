import { useState } from "react";
import { useRegister } from '../hooks/useRegister'
import { Link } from "react-router-dom"
import plusIcon from '../images/plus-icon.png'
import Nav from "../components/Nav";
import Languages from "../components/register/languages";

export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [nationality, setNationality] = useState("")
    const [about, setAbout] = useState("")
    const [languages, setLanguages] = useState([{language: "", level: "Beginner"}])
    const {register, isLoading, error} = useRegister()

    // async because needs to interact with backend
    const handleSubmit =  async(e) => {
        e.preventDefault();
        await register(email, password, name, age, nationality, languages, about)
    }

    const updateLanguage = (index, value) => {
        const newLanguages = [...languages]
        newLanguages[index].language = value
        setLanguages(newLanguages)
    }

    const updateLevel = (index, value) => {
        const newLanguages = [...languages]
        newLanguages[index].level = value
        setLanguages(newLanguages)
    }

    const addLanguage = () => {
        setLanguages((prevLanguages) => [...prevLanguages, {language: "", level: "Beginner"}])
    }

    const removeLanguage = (index) => {
        const newLanguages = [...languages]
        newLanguages.splice(index, 1)
        console.log(newLanguages)
        setLanguages(newLanguages)
    }
    console.log('LANGUAGES', languages)

    const languagesDisplay = languages.map((language, index) => 
    <Languages 
    languages={languages}
    updateLanguage={updateLanguage}
    updateLevel={updateLevel}
    addLanguage={addLanguage}
    removeLanguage={removeLanguage}
    index={index}
    />)

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
                    {languagesDisplay}
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