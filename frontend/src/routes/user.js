import { useEffect, useState } from "react"
import editIcon from "../images/edit-icon.png"
import friendIcon from "../images/friend-icon.png"
import messageIcon from "../images/message-icon.png"
import Nav from "../components/Nav"

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
        <div className="profile-page">
            <Nav />
        <main className="profile-main">
            <div className="profile-container profile-header">
                <div className="profile-banner"></div>
                <div className="profile-content">
                    <div className="profile-pic-container">
                        <div className="profile-pic"></div>
                    </div>
                    <div className="name-location-container">
                        <h2>Brian Smelter</h2>
                        <div>
                            <span className="location">London, UK</span>
                        </div>
                    </div>
                    <div className="edit-btn-container">
                        <button className="edit-btn"><img src={editIcon}></img></button>
                    </div>
                    <div className="languages-container">
                        <div className="language-rating">
                            <p>English</p>
                            <div className="rating">
                                <span className="level level-1"></span>
                                <span className="level level-2"></span>
                                <span className="level level-3"></span>
                                <span className="level level-4"></span>
                            </div>
                        </div>
                        <div className="language-rating">
                            <p>Korean</p>
                            <div className="rating">
                                <span className="level level-1"></span>
                                <span className="level level-2"></span>
                                <span className="level level-3"></span>
                                <span className="level level-4"></span>
                            </div>
                        </div>
                    </div>
                    <div className="friend-message-container">
                        <button className="add-friend-btn"><img src={friendIcon}></img></button>
                        <button className="message-btn"><img src={messageIcon}></img></button>
                    </div>
                </div>
            </div>
            <div className="profile-container profile-trust-container"></div>
            <div className="profile-container profile-about-container">
                <textarea />
            </div>
            <div className="profile-container profile-corrections-container"></div>
            <div className="profile-container profile-posts-container"></div>
        </main>
        </div>
    )
}