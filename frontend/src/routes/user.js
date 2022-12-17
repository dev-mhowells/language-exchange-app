import { useEffect, useState } from "react"

export default function User() {

    const [userData, setUserData] = useState('')

    useEffect(() => {
        fetch('/user').then(response => response.json())
        .then(data => {console.log(data); setUserData(data)})
    }, [])

    const userDisplay = userData && userData.map((el) => { 
        return (
            <div>
                <p>Name: {el.name}</p>
                <p>Age: {el.age}</p>
                <p>About: {el.about}</p>
            </div>
    )})

    return(
        <div>
            <h1>This is the user page</h1>
            {userDisplay}
        </div>
    )
}