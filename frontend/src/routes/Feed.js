import { useEffect, useState } from "react"
import FeedEntry from "../components/feed/FeedEntry"
import CorrectedEntry from "../components/feed/CorrectedEntry"
import { useAuthContext } from "../hooks/useAuthContext"

import Nav from "../components/Nav"
import Sidebar from "../components/Sidebar"

export default function Feed() {

    const {user} = useAuthContext()
    const [allEntries, setAllEntries] = useState([])

    useEffect(() => {

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