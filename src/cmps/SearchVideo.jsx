import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';

import { YoutubeApiService } from '../services/YoutubeApiService'

const SearchVideo = (props) => {
    const [queryStr, setQueryStr] = useState('');
    const [videos, setVideos] = useState([]);


    const searchYoutubeVideos = () => {
        if (!queryStr) setVideos([])
        const youtubeVideos = await youtubeApiService.youtubeQuery(this.queryStr);
        setSongs(youtubeVideos)
    }

    useEffect(() => {
    });

    return (
        <DebounceInput
            minLength={3}
            debounceTimeout={500}
            type="text"
            placeholder="Search Video"
            onChange={searchYoutubeVideos}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        room: state.room.currRoom,
    };
};

const mapDispatchToProps = {
    loadRoomById,
    saveRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);