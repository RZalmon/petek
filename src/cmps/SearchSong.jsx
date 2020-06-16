import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';

import { YoutubeApiService } from '../services/YoutubeApiService'

const SearchSong = (props) => {
    const [queryStr, setQueryStr] = useState('');
    const [songs, setSongs] = useState([]);


    const searchSong = () => {
        if (!queryStr) setSongs([])
        const youtubeSongs = await youtubeApiService.youtubeQuery(this.queryStr);
        setSongs(youtubeSongs)
    }

    useEffect(() => {
    });

    return (
        <DebounceInput
            minLength={3}
            debounceTimeout={500}
            type="text"
            placeholder="Search Video"
            onChange={searchSong}
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