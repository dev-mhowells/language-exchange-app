import React from "react";
import {useState, useEffect} from 'react'

const Entries = ({userId}) => {

    const exampleEntries = [
        {
            _id: '100',
            userId: 'asoduhasud',
            title: 'Some title',
            entry: 'This is some text someone might type',
            date: '01.01.2023',
            corrections: ['this is an example correction']
        },
        {
            _id: '200',
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

    useEffect(() => {})

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

    const deleteEntry = (id) => {
        setEntries((prevEntries) => prevEntries.filter((entry) => entry._id !== id))
    }

    console.log('THESE ARE ENTRIES', entries)

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