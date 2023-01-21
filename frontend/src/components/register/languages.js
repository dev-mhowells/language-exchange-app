import React from "react";
import plusIcon from '../../images/plus-icon.png'
import minusIcon from '../../images/minus-icon.png'



const Languages = (props) => {

    return (
        <div className="languages">
            <input 
            type='text' 
            name='language'
            value={props.languages[props.index].language}
            onChange={(e) => props.updateLanguage(props.index, e.target.value)}
            ></input>
            <select 
            className="language-dropdown"
            type='text' 
            name='level'
            value={props.languages[props.index].level}
            onChange={(e) => props.updateLevel(props.index, e.target.value)}
            >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Native">Native</option>
            </select>
            {props.index + 1 === props.languages.length ? 
            <button className="add-language-btn" type='button' onClick={props.addLanguage}>
                <img src={plusIcon}></img>
            </button>
            :
            <button className="add-language-btn" type='button' onClick={() => props.removeLanguage(props.index)}>
                <img src={minusIcon}></img>
            </button>}
        </div>
    )
}

export default Languages