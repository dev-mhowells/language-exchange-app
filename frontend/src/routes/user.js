import { useEffect, useState } from "react"

export default function User() {

    const [userData, setUserData] = useState('')

    useEffect(() => {
        fetch('/user').then(response => response.json())
        .then(data => {setUserData(data)})
    }, [])

    const userDisplay = userData && userData.map((el) => { 
        return (
            <div>
                <p>Name: {el.name}</p>
                <p>Age: {el.age}</p>
                <p>About: {el.about}</p>
            </div>
    )})

    return(
        <main className="profile-main">
            <div className="profile-container profile-header">
                <div className="profile-banner"></div>
            </div>
            <div className="profile-container profile-trust-container"></div>
            <div className="profile-container profile-about-container">
                <textarea />
            </div>
            <div className="profile-container profile-corrections-container"></div>
            <div className="profile-container profile-posts-container"></div>
        </main>
    )
}