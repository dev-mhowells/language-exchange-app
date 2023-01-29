import { useState } from "react"
import CorrectedEntry from "./CorrectedEntry"
import Correction from "./Correction"

export default function FeedEntry({entry}) {

    const [showMakeCorrection, setShowMakeCorrection] = useState(false)
    const [showCorrections, setShowCorrections] = useState(false)
    // const [allCorrections, setAllCorrections] = useState([])

    let allCorrections = []

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

    console.log('ALL CORRECTIONS', allCorrections)

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
            {showCorrections && allCorrectionsDisplay}
        </div>
    )
}