import React from "react";
import {useState} from 'react'

const Entries = ({userId}) => {
    const exampleEntries = [
        {
            userId: 'asoduhasud',
            title: 'Some title',
            entry: 'This is some text someone might type',
            date: '01.01.2023',
            corrections: ['this is an example correction']
        },
        {
            userId: 'asoduhasdaud',
            title: 'Some 2 title',
            entry: 'This is some text someone 2 might type',
            date: '01.09.2023',
            corrections: ['this is an example correction']
        }
    ]
    const [entries, setEntries] = useState(exampleEntries)
    const [title, setTitle] = useState('')
    const [entry, setEntry] = useState('')

    const getDate = () => {
        const date = new Date()
        let month = date.getMonth() + 1
        if (month < 10) {month = '0' + month}
        return `${date.getDate()}.${month}.${date.getFullYear()}`
    }

    const updateEntries = () => {
        setEntries((prevEntries) => [...prevEntries, {title, entry, userId, date: getDate()}])
        setTitle('')
        setEntry('')
    }
    console.log('THESE ARE ENTRIES', entries)

    const entriesDisplay = entries.map((entryObj) => (
        <div className="entry">
            <h3>{entryObj.title}</h3>
            <p>{entryObj.date}</p>
            <p>{entryObj.entry}</p>
        </div>
    ))

    const createEntry = (
    <div className="create-entry">
        <input value={title} onChange={((e) => setTitle(e.target.value))}></input>
        <textarea value={entry} onChange={((e) => setEntry(e.target.value))}></textarea>
        <button onClick={updateEntries}>post</button>
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