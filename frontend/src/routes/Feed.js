import { useEffect, useState } from "react"

import Nav from "../components/Nav"
import Sidebar from "../components/Sidebar"
import arrowRight from '../images/arrow-right.png'
import arrowLeft from '../images/arrow-left.png'

const exampleEntry1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a dolor velit. Nunc ut tortor feugiat, tristique ante imperdiet, elementum risus. Quisque accumsan ultricies sapien a finibus. Vivamus aliquam orci ac urna fringilla mattis. Donec fermentum sem in viverra tincidunt. Nam ac quam quam. Curabitur hendrerit, justo quis iaculis mattis, ex nibh molestie mi, vel suscipit felis nulla ac lorem. Proin tempus convallis nulla dapibus tempus. Etiam commodo nunc ac tortor consequat ullamcorper. Nullam ullamcorper sagittis varius. Fusce quis feugiat nunc. Nam dignissim ex at libero porta, et mattis dui congue. Praesent nunc massa, dapibus sed purus sed, commodo elementum velit. Nullam convallis purus in metus aliquam tempor. Fusce facilisis tellus in nibh mollis accumsan. "
const exampleEntry2 = "Integer interdum sapien vel justo congue aliquet. Duis leo turpis, consequat in molestie at, viverra eget tellus. Donec pulvinar egestas arcu, sit amet rutrum urna rhoncus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec id accumsan ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id sollicitudin ante. Ut luctus, tellus ut tincidunt interdum, sem neque iaculis magna, ut venenatis augue orci quis est. Suspendisse hendrerit lacus eget tortor ultrices, vel pulvinar quam feugiat. "

const exampleEntries = [{title: 'something', text: exampleEntry1, date: '01.01.2023'},
                        {title: 'something2', text: exampleEntry2, date: '01.02.2023'}]

function Correction({entryText}) {

    const [sentenceToEdit, setSentenceToEdit] = useState('')
    const [count, setCount] = useState(0)
    const [entrySentences, setEntrySentences] = useState([])

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
        setEntrySentences(newEntrySentences)
    }

    const saveAndContinue = () => {
        saveEdit(count)
        countUp()
        setSentenceToEdit(entrySentences[count])
    }

    const correctedEntryDisplay = entrySentences?.map((sentenceObj, index) => {

        const styles = {
            backgroundColor: index === count ? 'yellow' : 'transparent',
            display: 'inline'
        }

        return <p style={styles}>{sentenceObj.sentence}{`. `}</p>
    })

    return (
        <div className="correction">
            <div className="progress-bar"></div>
            <div className="sentence-correction">
                <p>{allSentences[count]?.sentence}</p>
                <textarea className="edit-sentence" value={sentenceToEdit?.sentence} onChange={(e) => editSentence(e.target.value)}></textarea>
            </div>
            <div className="slider">
                <button onClick={countDown}><img src={arrowLeft}></img></button>
                <button onClick={() => saveEdit(count)}>save</button>
                <button onClick={() => saveAndContinue()}><img src={arrowRight}></img></button>
            </div>
            <div className="entry-correction">
                {correctedEntryDisplay}
            </div>
        </div>
    )
}
        

function FeedEntry({entry}) {
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
                <p>{entry.text}</p>
                <div className="entry-btns">
                </div>
            </div>
            <div className="corrections-comments">
                <button>corrections 0</button>
                <button>comments 0</button>
            </div>
            <Correction entryText={entry.text}/>
        </div>
    )
}

const allEntries = exampleEntries.map((entry) => {
    return < FeedEntry entry={entry} />
})

export default function Feed() {
    return(
        <div className="feed-page">
            <Nav />
            <main className="feed-main">
                <Sidebar />
                <div className="entries-feed">
                {allEntries}
                </div>
            </main>
        </div>
    )
}