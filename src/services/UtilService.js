import axios from 'axios';



export const UtilService = {
    makeId,
    getRandomChuck
    // getRandomMeme
}

function makeId(length = 12) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

async function getRandomChuck(){
    const res = await axios.get(`https://api.chucknorris.io/jokes/random`);
    return res.data.value
}
// async function getRandomMeme(){
//     const res = await axios.get(`https://meme-api.herokuapp.com/gimme/dankmemes/1`);
//      let imgObj = {imgUrl:res.data.memes[0].url, imgHeader:res.data.memes[0].title }
//      return imgObj
// }