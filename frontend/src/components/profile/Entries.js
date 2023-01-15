import React from "react";
import {useState} from 'react'
import { useAuthContext } from "../../hooks/useAuthContext";
import Entry from './Entry.js'

const Entries = ({userId, fetchedEntries}) => {

    const {user} = useAuthContext()
    const [entries, setEntries] = useState(fetchedEntries)
    const [title, setTitle] = useState('')
    const [entry, setEntry] = useState('')

    const getDate = () => {
        const date = new Date()
        let month = date.getMonth() + 1
        if (month < 10) {month = '0' + month}
        return `${date.getDate()}.${month}.${date.getFullYear()}`
    }

    const updateEntries = async () => {

        const entryObj = {
            user_id: userId,
            title,
            entry,
            date: getDate(),
        }

        setEntries((prevEntries) => [...prevEntries, entryObj])
        setTitle('')
        setEntry('')

        const response = await fetch('/profile/createEntry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(entryObj)
        })
        const json = await response.json()

        if(!response.ok) {
            console.log(json.error)
        }
        if(response.ok) {
            console.log(json)
        }
    }

    const entriesDisplay = entries.map((entryObj) => <Entry entryObj={entryObj} setEntries={setEntries}/>)

    return (
        <section className="entries-section">
                <div className="create-entry">
        <label>title
            <input value={title} onChange={((e) => setTitle(e.target.value))}></input>
        </label>
        <label>entry 
            <textarea value={entry} onChange={((e) => setEntry(e.target.value))}></textarea>
        </label>
        <button onClick={() => updateEntries()}>post</button>
    </div>
            <div className="entries-display">
                {entriesDisplay}
            </div>
        </section>
    )
}

export default Entries