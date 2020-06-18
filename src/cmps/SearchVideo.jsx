import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';

import { YoutubeApiService } from '../services/YoutubeApiService'

import PlusIcon from '../assets/svg/plus.svg'

const SearchVideo = ({ setNoteData, handleSubmit, addVideo }) => {
    const [videos, setVideos] = useState([]);

    const searchYoutubeVideos = async (queryStr) => {
        if (!queryStr) {
            setVideos([])
            return
        }
        const youtubeVideos = await YoutubeApiService.youtubeQuery(queryStr);
        setVideos(youtubeVideos)
    }

    // const addVideo = (videoId) => {
    //     setNoteData(videoId)
    //     handleSubmit()
    // }


    useEffect(() => {
    });

    return (
        <section className="search-video">
            <DebounceInput
                minLength={0}
                debounceTimeout={500}
                type="text"
                placeholder="Search Video"
                onChange={e => searchYoutubeVideos(e.target.value)}
            />
            {!!videos.length && videos.map(video => {
                return (
                    <div className="video-card" key={video.id.videoId}>
                        <img src={video.snippet.thumbnails.default.url} />
                        <h6>{video.snippet.title}</h6>
                        <img src={PlusIcon} className="add-button" onClick={() => addVideo(video.id.videoId)} />
                    </div>
                )
            })}
        </section >
    );
};

const mapStateToProps = (state) => {
    return {
        room: state.room.currRoom,
    };
};

const mapDispatchToProps = {
    // loadRoomById,
    // saveRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchVideo);