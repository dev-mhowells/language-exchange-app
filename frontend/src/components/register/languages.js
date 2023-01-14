import React from "react";
import plusIcon from '../../images/plus-icon.png'

const Languages = (props) => {
    return (
        <div className="languages">
            <input 
            type='text' 
            name='language'
            value={props.languages.language}
            onChange={(e) => props.updateLanguage(props.index, e.target.value)}
            ></input>
            <select 
            className="language-dropdown"
            type='text' 
            name='level'
            default='Beginner'
            onChange={(e) => props.updateLevel(props.index, e.target.value)}
            >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>
            {props.index + 1 === props.languages.length && <button className="add-language-btn" type='button' onClick={props.addLanguage}><img src={plusIcon}></img></button>}
        </div>
    )
}

export default Languages