import Nav from "../components/Nav"
import plusIconBoxed from '../images/plus-icon-boxed.png'
import messageIconBlack from '../images/message-icon-black.png'
import friendsIcon from '../images/friends-icon.png'

const exampleEntries = [{title: 'something', entry: 'some text', date: '01.01.2023'},
                        {title: 'something2', entry: 'some text 2', date: '01.02.2023'}]

function FeedEntry({entry}) {
    return (
        <div className="entry-container-outer">
            <div className="entry-poster-info">
                <div className="profile-pic"></div>
                <div className="name-display">
                    <h2>Brian Smelter</h2>
                    <p className="outlined-element">London</p>
                </div>
            </div>
            <div className="entry-container">
                <div className="entry-headers">
                    <p className="entry-title">{entry.title}</p>
                    <p>{entry.date}</p>
                </div>
                <p>{entry.entry}</p>
                <div className="entry-btns">
                </div>
            </div>
            <div className="corrections-comments">
                <button>corrections 0</button>
                <button>comments 0</button>
            </div>
        </div>
    )
}

const allEntries = exampleEntries.map((entry) => {
    return < FeedEntry entry={entry} />
})

function Sidebar() {
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
                    <p>message</p>
                </li>
                <li>
                    <img src={friendsIcon} className='sidebar-icon'></img>
                    <p>friends</p>
                </li>
            </ul>
        </div>
    </div>)
}

export default function Feed() {
    return(
        <div className="feed-page">
            <Nav />
            <main className="feed-main">
                <Sidebar />
                <div className="entries-feed">
                {allEntries}
                </div>
            </main>
        </div>
    )
}