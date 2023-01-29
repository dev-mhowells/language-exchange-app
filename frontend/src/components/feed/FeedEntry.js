import { useEffect, useState } from "react"
import CorrectedEntry from "./CorrectedEntry"
import Correction from "./Correction"
import { useAuthContext } from "../../hooks/useAuthContext"

export default function FeedEntry({entry}) {

    const [showMakeCorrection, setShowMakeCorrection] = useState(false)
    const [showCorrections, setShowCorrections] = useState(false)
    const [allCorrections, setAllCorrections] = useState([])
    const {user} = useAuthContext()

    console.log('this is the entry', entry)

    // useEffect(() => {
    //     if(entry.corrections.length > 0) setAllCorrections(entry.corrections)
    // })

    // const fetchCorrections = async () => {
    //     const response = await fetch('/entry/getEntryCorrections', {
    //         method: 'GET',
    //         headers: {
    //                 'Authorization': `Bearer ${user.token}`
    //         },
    //     })
    //     const data = await response.json()
    //     setAllCorrections(data)

    //     if (response.ok) {
    //         console.log('CORRECTIONS DATA', data)
    //     }
    // }

    const toggleMakeCorrection = () => {
        setShowMakeCorrection((prev) => !prev)
    }

    const toggleShowCorrections = () => {
        setShowCorrections((prev) => !prev)
    }

    const allCorrectionsDisplay = allCorrections.map((entrySentences) => {
        const display = entrySentences.map((sentenceObj, index) => {
            return <CorrectedEntry sentenceObj={sentenceObj} index={index} />
        })
        return <div className="entry-correction">{display}</div>
    })

    const newDisplay = entry.corrections?.map((correctionObj) => {
        const display = correctionObj.corrections.map((sentenceObj, index) => {
            return <CorrectedEntry sentenceObj={sentenceObj} index={index} />
        })
        return <div className="entry-correction">{display}</div>
    })

    // const allCorrectionsDisplay = entry.corrections?.map((entrySentences) => {
    //     const display = entrySentences.map((sentenceObj, index) => {
    //         return <CorrectedEntry sentenceObj={sentenceObj} index={index} />
    //     })
    //     return <div className="entry-correction">{display}</div>
    // })

    console.log('CORRECTIONS__', entry.corrections)

    // console.log('ALL CORRECTIONS', allCorrections)

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
                <button onClick={toggleMakeCorrection}>make a correction</button>
                <button onClick={toggleShowCorrections}>corrections 0</button>
                <button>comments 0</button>
            </div>
            {/* {showMakeCorrection && <Correction entryText={entry.text} setAllCorrections={setAllCorrections} allCorrections={allCorrections}/>}         */}
            {showMakeCorrection && <Correction entryText={entry.entry} allCorrections={allCorrections}/>}        
            {/* {showCorrections && allCorrectionsDisplay} */}
            {showCorrections && newDisplay}
        </div>
    )
}