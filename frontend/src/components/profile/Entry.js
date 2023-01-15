import React from "react";
import {useState} from 'react'
import { useAuthContext } from "../../hooks/useAuthContext";

const Entry = ({entryObj, setEntries}) => {

    const {user} = useAuthContext()
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState('')
    const [entry, setEntry] = useState('')

    const editEntry = () => {
        setIsEditing((prevIsEditing) => !prevIsEditing)
        setTitle(entryObj.title)
        setEntry(entryObj.entry)
    } 

    const deleteEntry = async (id) => {
        console.log('ID TO DELETE IN ENTRY', id)
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

    return (
        <div className="entry-container">
        <div className="entry-headers">
            {isEditing ? 
            <input onChange={(e) => (setTitle(e.target.value))}>{title}</input> 
            : 
            <p className="entry-title">{entryObj.title}</p>}
            <p>{entryObj.date}</p>
        </div>
        {isEditing ? 
        <textarea onChange={(e) => (setEntry(e.target.value))}>{entry}</textarea> 
        : 
        <p>{entryObj.entry}</p>}
    <div className="entry-btns">
        <button onClick={() => {editEntry()}}>edit</button>
        <button onClick={() => {deleteEntry(entryObj._id)}}>delete</button>
    </div>
</div>
    )
}
export default Entry