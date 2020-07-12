import React, { useState } from 'react'
import { ReactMic } from 'react-mic';

import recordIcon from '../../assets/svg/microphone.svg'
import stopIcon from '../../assets/svg/stop.svg'

export default ({ setNoteData, setNoteHeader, handleSubmit }) => {
    const [isRecording, setIsRecording] = useState(false)
    const [record, setRecord] = useState(null)

    const startRecording = () => {
        setIsRecording(true)
    }

    const stopRecording = () => {
        setIsRecording(false)
    }

    const onData = (recordedBlob) => {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    const onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
        setRecord(recordedBlob.blobURL)
    }

    return (
        <div className="input-sound">
            <input className="input-header" placeholder="Note Header" type="text" onChange={e => setNoteHeader(e.target.value)} />
            <ReactMic
                record={isRecording}
                className="sound-wave"
                visualSetting="sinewave"
                frequencyBars
                onStop={onStop}
                onData={onData}
                strokeColor="#017fc6"
                backgroundColor="#000000" />
            <img
                onClick={() => isRecording ? stopRecording() : startRecording()}
                alt="Record/Stop"
                type="button"
                className="rec-btn"
                src={isRecording ? stopIcon : recordIcon}
            />
            {/* <button onClick={() => stopRecording()} type="button">Stop</button> */}
            {record && <audio controls>
                <source src={record} type="audio/webm" />
            </audio>}
            <button onClick={() => console.log(record)}>Print state</button>
        </div>
    )
}
///TODOS: FIX SECOND RECORD BUG(CONSIDER REFS)
//FINISH NOTESOUND
//FINISH UI