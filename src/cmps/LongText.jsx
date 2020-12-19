import React, { useState, useEffect } from 'react'

export default ({ text, limit }) => {
    const [isLongText, setIsLongText] = useState('')
    const [textToShow, setTextToShow] = useState('')

    const toggleIsLongText = () => {
        setIsLongText(!isLongText)
        setText()
    }

    const setText = () => {
        isLongText ? setTextToShow(text.substring(0, limit) + '...') : setTextToShow(text)
    }

    useEffect(() => {
        setIsLongText(text.length > limit)
    }, [])

    useEffect(() => {
        setText()
    }, [isLongText])

    useEffect(() => {
        setText()
    }, [text])

    return (
        <div className="long-text">
            {!!textToShow.length && <p>
                {textToShow}
                {text.length > limit && <span class="long-text-btn" onClick={toggleIsLongText}>{textToShow.length > limit + 4 ? 'Read Less' : 'Read More'}</span>}
            </p>}
        </div>
    )
}
