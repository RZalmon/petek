import axios from 'axios';



export const UtilService = {
    makeId,
    getRandomMeme
}

function makeId(length = 12) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

async function getRandomMeme(){
    const res = await axios.get(`https://meme-api.herokuapp.com/gimme/dankmemes/1`);
     let imgObj = {imgUrl:res.data.memes[0].url, imgHeader:res.data.memes[0].title }
     return imgObj
}