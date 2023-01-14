import { useEffect, useState } from "react"
import editIcon from "../images/edit-icon.png"
import friendIcon from "../images/friend-icon.png"
import messageIcon from "../images/message-icon.png"
import Nav from "../components/Nav"
import Entries from "../components/profile/Entries"
import { useAuthContext } from '../hooks/useAuthContext'

export default function Profile() {

    const [userData, setUserData] = useState('')
    const {user} = useAuthContext()

    useEffect(() => {
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
            const data = await response.json()
            setUserData(data)
            // console.log('THIS IS USER - RES FROM PROFILE CONTROLLER', json)

            if (response.ok) {
                console.log(data)
            }
        }
        // Here if the user logged in is not the owner of the profile page,
        // they do not have permission to access the editable version of the page
        
        if (user) {
            fetchProfile()
        }
    }, [user])

    const languageAbilityDisplay = userData?.languages?.map((languageObj) => {

        let level

        switch(languageObj.level) {
            case 'Beginner':
                level = 1;
                break;
            case 'Intermediate':
                level = 2;
                break;
            case 'Advanced':
                level = 3;
                break;
            case 'Native':
                level = 4;
                break;
        }

        return (                        
        <div className="language-rating">
            <p>{languageObj.language}</p>
            <div className="rating">
                <span className={`${level >= 1 ? 'level' : 'level-hidden'} level-1`}></span>
                <span className={`${level >= 2 ? 'level' : 'level-hidden'} level-2`}></span>
                <span className={`${level >= 3 ? 'level' : 'level-hidden'} level-3`}></span>
                <span className={`${level === 4 ? 'level' : 'level-hidden'} level-4`}></span>
            </div>
        </div>)})

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
                        <h2>{userData.name}</h2>
                        <div>
                            <span className="location">{userData.nationality}</span>
                        </div>
                    </div>
                    <div className="edit-btn-container">
                        <button className="edit-btn"><img src={editIcon}></img></button>
                    </div>
                    <div className="languages-container">
                        {languageAbilityDisplay}
                    </div>
                    <div className="friend-message-container">
                        <button className="add-friend-btn"><img src={friendIcon}></img></button>
                        <button className="message-btn"><img src={messageIcon}></img></button>
                    </div>
                </div>
            </div>
            <div className="profile-container profile-trust-container"></div>
            <div className="profile-container profile-about-container">
                {/* <textarea /> */}
                <h3>about</h3>
                {userData.about}
            </div>
            <div className="profile-container profile-corrections-container"></div>
            <div className="profile-container profile-posts-container">
                <h3>Entries:</h3>
                <Entries />
            </div>
        </main>
        </div>
    )
}