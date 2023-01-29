export default function CorrectedEntry({sentenceObj, index, count}) {
    let color = 'transparent'
        if (sentenceObj.edited === true) color = '#FFF4CD'
        if(sentenceObj.markedCorrect === true) color = '#C5FFAA'
        if (index === count) color = '#FFF859'

        const styles = {
            backgroundColor: color,
            display: 'inline',
            padding: '.3em 0.1em',
            boxShadow: '0 0 .3em .3em white inset'
        }

        return <p style={styles}>{sentenceObj.sentence}{`. `}</p>
}