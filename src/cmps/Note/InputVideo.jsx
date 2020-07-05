import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';

import { YoutubeApiService } from '../../services/YoutubeApiService'

import PlusIcon from '../../assets/svg/plus.svg'

export default ({ addVideo, setNoteHeader }) => {
    const [videos, setVideos] = useState([]);

    const searchYoutubeVideos = async (queryStr) => {
        if (!queryStr) {
            setVideos([])
            return
        }
        const youtubeVideos = await YoutubeApiService.youtubeQuery(queryStr);
        setVideos(youtubeVideos)
    }

    return (
        <section className="input-video">
            <input className="input-header" placeholder="Note Header" type="text" onChange={e => setNoteHeader(e.target.value)} />
            <DebounceInput
            className="search-input"
                minLength={0}
                debounceTimeout={500}
                type="text"
                placeholder="Search Video"
                onChange={e => searchYoutubeVideos(e.target.value)}
            />
            {!!videos.length &&<h1>Add video!</h1>}
            {!!videos.length && videos.map(video => {
                return (
                    <div className="video-card" key={video.id.videoId}>
                        <img src={video.snippet.thumbnails.default.url} alt="Video Thumbnail" />
                        <h6>{video.snippet.title}</h6>
                        <img src={PlusIcon} className="add-button" alt="Plus Icon" onClick={() => { addVideo(video.id.videoId); setVideos([]) }} />
                    </div>
                )
            })}
        </section >
    );
};