import { useEffect, useState } from "react"
import editIcon from "../images/edit-icon.png"
import friendIcon from "../images/friend-icon.png"
import messageIcon from "../images/message-icon.png"
import Nav from "../components/Nav"
import { useAuthContext } from '../hooks/useAuthContext'

export default function User() {

    const [userData, setUserData] = useState('')
    const {user} = useAuthContext()

    useEffect(() => {
        // if (user) {
        // fetch('/profile').then(response => response.json())
        // .then(data => {console.log('data in effect', data); setUserData(data)})
        // }
        // we send the header with the auth token to /profile to be
        // grabbed on the backend middleware which will check validation
        const fetchProfile = async () => {
            const response = await fetch('/profile', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            // This is the res user from userProfileController -
            // use this to pop page!
            const json = await response.json()
            console.log('THIS IS USER - RES FROM PROFILE CONTROLLER', json)

            if (response.ok) {
                console.log(json)
            }
        }
        // Here if the user logged in is not the owner of the profile page,
        // they do not have permission to access the editable version of the page
        
        if (user) {
            fetchProfile()
        }
    }, [user])

    console.log('THIS IS USER - LOGGED IN', user)

    // NOTE: will only be able to map data if data does not error
    // as in the base there is not token

    // const userDisplay = userData && userData.map((el) => { 
    //     return (
    //         <div>
    //             <p>Name: {el.name}</p>
    //             <p>Age: {el.age}</p>
    //             <p>About: {el.about}</p>
    //         </div>
    // )})

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