import axios from 'axios';

const API_KEY = 'AIzaSyDD1nIJuc1thshvoaRykKhVDjI8-kbDSFM' 
const limit = 15;


export const youtubeApiService = {
    youtubeQuery
}


async function youtubeQuery(query) {
    try {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${query}&maxResults=${limit}`);
        return res.data.items;
    } catch (err) {
        console.log('Error while fetching videos',err); 
    }
}