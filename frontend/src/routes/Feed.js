import { useEffect, useState } from "react"
import FeedEntry from "../components/feed/FeedEntry"
import CorrectedEntry from "../components/feed/CorrectedEntry"
import { useAuthContext } from "../hooks/useAuthContext"

import Nav from "../components/Nav"
import Sidebar from "../components/Sidebar"
import arrowRight from '../images/arrow-right.png'
// import arrowLeft from '../images/arrow-left.png'
// import checkmark from '../images/checkmark.png'

const exampleEntry1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a dolor velit. Nunc ut tortor feugiat, tristique ante imperdiet, elementum risus. Quisque accumsan ultricies sapien a finibus. Vivamus aliquam orci ac urna fringilla mattis. Donec fermentum sem in viverra tincidunt. Nam ac quam quam. Curabitur hendrerit, justo quis iaculis mattis, ex nibh molestie mi, vel suscipit felis nulla ac lorem. Proin tempus convallis nulla dapibus tempus. Etiam commodo nunc ac tortor consequat ullamcorper. Nullam ullamcorper sagittis varius. Fusce quis feugiat nunc. Nam dignissim ex at libero porta, et mattis dui congue. Praesent nunc massa, dapibus sed purus sed, commodo elementum velit. Nullam convallis purus in metus aliquam tempor. Fusce facilisis tellus in nibh mollis accumsan. "
const exampleEntry2 = "Integer interdum sapien vel justo congue aliquet. Duis leo turpis, consequat in molestie at, viverra eget tellus. Donec pulvinar egestas arcu, sit amet rutrum urna rhoncus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec id accumsan ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id sollicitudin ante. Ut luctus, tellus ut tincidunt interdum, sem neque iaculis magna, ut venenatis augue orci quis est. Suspendisse hendrerit lacus eget tortor ultrices, vel pulvinar quam feugiat. "

const exampleEntries = [{title: 'something', entry: exampleEntry1, date: '01.01.2023'},
                        {title: 'something2', entry: exampleEntry2, date: '01.02.2023'}]

let allCorrections = []

export default function Feed() {

    const {user} = useAuthContext()
    const [allEntries, setAllEntries] = useState([])

    useEffect(() => {

        console.log('this is user', user)

        const fetchEntries = async () => {
            const response = await fetch('/feed', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json()
            setAllEntries(data)

            if (response.ok) {
                console.log(data)
            }
        }

        // on page refresh, user is null on first render
        // this ensures user and therefore user.token exists
        // before fetching the entries
        if(user) {
            fetchEntries()
        }
    }, [user])

    const allEntriesDisplay = allEntries?.map((entry) => {
        return < FeedEntry entry={entry} />
    })

    return(
        <div className="feed-page">
            <Nav />
            <main className="feed-main">
                <Sidebar />
                <div className="entries-feed">
                {allEntriesDisplay}
                </div>
            </main>
        </div>
    )
}