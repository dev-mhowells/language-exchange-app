import { useState } from "react"
import { useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import CorrectedEntry from "./CorrectedEntry"
import arrowLeft from '../../images/arrow-left.png'
import checkmark from '../../images/checkmark.png'

export default function Correction({entryText, setAllCorrections, allCorrections, entryId}) {

    const [sentenceToEdit, setSentenceToEdit] = useState('')
    const [count, setCount] = useState(0)
    const [entrySentences, setEntrySentences] = useState([])
    const {user} = useAuthContext()

    const allSentences = entryText.split('. ').map((sentence) => {
        return {sentence, markedCorrect: false, edited: false}
    })

    useEffect(() => {
        setEntrySentences(allSentences)
    }, [])

    // keep sentence to edit in sync with display change from count
    useEffect(() => {
        !sentenceToEdit ? 
        setSentenceToEdit(allSentences[count]) :
        setSentenceToEdit(entrySentences[count])
    }, [count])

    const countUp = () => {
        if(count < entrySentences.length - 2) {
            setCount((prevCount) => prevCount + 1)
        }
    }

    const countDown = () => {
        if (count > 0) {
            setCount((prevCount) => prevCount - 1)
        }
    }

    const editSentence = (sentence) => {
        setSentenceToEdit({...sentenceToEdit, sentence})
    }

    const saveEdit = (count) => {
        const newEntrySentences = entrySentences
        newEntrySentences[count] = sentenceToEdit

        if(allSentences[count].sentence !== sentenceToEdit.sentence) {
            newEntrySentences[count].edited = true
            newEntrySentences[count].markedCorrect = false
            setEntrySentences(newEntrySentences)
        } else {
            newEntrySentences[count].edited = false
            newEntrySentences[count].markedCorrect = true
            setEntrySentences(newEntrySentences)
            }
    }

    const saveAndContinue = () => {
        saveEdit(count)
        countUp()
        setSentenceToEdit(entrySentences[count])
    }

    const saveAndExit = async () => {

        const correctionObject = {
            // user_id: '',
            entry_id: entryId,
            corrections: entrySentences
        }

        const response = await fetch('/entry/createCorrection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(correctionObject),
        })
        const data = await response.json()

        setAllCorrections((prev) => [...prev, data])

        if (response.ok) {
            console.log(data)
        }
    }

    const correctedEntryDisplay = entrySentences?.map((sentenceObj, index) => {
        return <CorrectedEntry sentenceObj={sentenceObj} index={index} count={count} />
    })

    return (
        <div className="correction">
            <div className="sentence-correction">
                <p>{allSentences[count]?.sentence}</p>
                <textarea className="edit-sentence" value={sentenceToEdit?.sentence} onChange={(e) => editSentence(e.target.value)}></textarea>
            </div>
            <div className="slider">
                <button onClick={countDown}><img src={arrowLeft}></img></button>
                <button onClick={saveAndExit}>save and exit</button>
                <button onClick={() => saveAndContinue()}><img src={checkmark}></img></button>
            </div>
            <div className="entry-correction">
                {correctedEntryDisplay}
            </div>
        </div>
    )
}