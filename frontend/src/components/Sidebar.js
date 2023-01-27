import plusIconBoxed from '../images/plus-icon-boxed.png'
import messageIconBlack from '../images/message-icon-black.png'
import friendsIcon from '../images/friends-icon.png'

export default function Sidebar() {
    return (
    <div className="sidebar">
        <div className="sidebar-profile">
            <div className="profile-pic"></div>
                <div className="name-display">
                    <h2>Brian Smelter</h2>
                    <p className="outlined-element">London</p>
                </div>
                <div className="profile-data-display">
                    <div className="profile-data-el outlined-element">
                        <p>friends</p>
                        <p>12</p>
                    </div>
                    <div className="profile-data-el outlined-element">
                        <p>posts</p>
                        <p>9</p>
                    </div>
                    <div className="profile-data-el outlined-element">
                        <p>corrections</p>
                        <p>11</p>
                    </div>
                </div>
        </div>
        <div className="divider" />
        <div className="sidebar-links">
            <ul>
                <li>
                    <img src={plusIconBoxed} className='sidebar-icon'></img>
                    <p>post</p>
                </li>
                <li>
                    <img src={messageIconBlack} className='sidebar-icon'></img>
                    <p>messages</p>
                </li>
                <li>
                    <img src={friendsIcon} className='sidebar-icon'></img>
                    <p>friends</p>
                </li>
            </ul>
        </div>
    </div>)
}