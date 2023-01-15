import React from "react";
import {useState} from 'react'
import { useAuthContext } from "../../hooks/useAuthContext";

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

    const deleteEntry = async (id) => {
        setEntries((prevEntries) => prevEntries.filter((entry) => entry._id !== id))

        const response = await fetch('/profile/deleteEntry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({_id: id})
        })
        const json = await response.json()

        if(!response.ok) {
            console.log(json.error)
        }
        if(response.ok) {
            console.log(json)
        }
    }

    const entriesDisplay = entries.map((entryObj) => (
        <div className="entry-container">
                <div className="entry-headers">
                    <p className="entry-title">{entryObj.title}</p>
                    <p>{entryObj.date}</p>
                </div>
                <p>{entryObj.entry}</p>
            <div className="entry-btns">
                <button>edit</button>
                <button onClick={() => {deleteEntry(entryObj._id)}}>delete</button>
            </div>
        </div>
    ))

    const createEntry = (
    <div className="create-entry">
        <label>title
            <input value={title} onChange={((e) => setTitle(e.target.value))}></input>
        </label>
        <label>entry 
            <textarea value={entry} onChange={((e) => setEntry(e.target.value))}></textarea>
        </label>
        <button onClick={() => updateEntries()}>post</button>
    </div>)

    return (
        <section className="entries-section">
            {createEntry}
            <div className="entries-display">
                {entriesDisplay}
            </div>
        </section>
    )
}

export default Entries