
import { HttpService } from './HttpService';
import { StorageService } from './StorageService';

var demoNotes = [
    {
        _id: 'd4a5x',
        type: 'NoteText',
        data: `Free I feel free like you promised I'd be`,
        style: {
            backgroundColor: '#90ccf4'
        }
    },
    {
        _id: 'ZzZzZ',
        type: 'NoteVideo',
        data: 'https://www.youtube.com/embed/aYDfwUJzYQg',
        style: {
            backgroundColor: '#4caf50'
        }
    },
    {
        _id: 'XxXxX',
        type: 'NoteImg',
        data: 'https://media.giphy.com/media/PDmXIQru17Udy/giphy.gif',
        style: {
            backgroundColor: '#f3d250'
        }
    },
    {
        _id: 'AaAaA',
        type: 'NoteTodo',
        data: [
            { txt: 'Eat', isDone: false },
            { txt: 'Pray', isDone: false },
            { txt: 'Love', isDone: true },
        ],
        style: {
            backgroundColor: '#f78888'
        }
    },
    {
        _id: 'Babab',
        type: 'NoteText',
        data: 'Rak TB!',
        style: {
            backgroundColor: '#4caf50'
        }
    },
    {
        _id: 'C3PO1',
        type: 'NoteImg',
        data: 'https://www.myabandonware.com/media/screenshots/j/jazz-jackrabbit-2-4dm/jazz-jackrabbit-2_3.jpg',
        style: {
            backgroundColor: '#ffa350'
        }
    },
    {
        _id: 'R2D21',
        type: 'NoteImg',
        data: 'https://media.giphy.com/media/l11IVhXPESQqu0z3GQ/giphy.gif',
        style: {
            backgroundColor: '#f78888'
        }
    },
    {
        _id: '12d2r',
        type: 'NoteImg',
        data: 'https://media.giphy.com/media/mi6DsSSNKDbUY/giphy.gif',
        style: {
            backgroundColor: '#ffa350'
        }
    },
    {
        _id: 'SPura',
        type: 'NoteTodo',
        data: [
            { txt: 'Elections1', isDone: true },
            { txt: 'Elections2', isDone: true },
            { txt: 'Elections3', isDone: true },
        ],
        style: {
            backgroundColor: '#ffa350'
        }
    },
    {
        _id: 'SPurs',
        type: 'NoteImg',
        data: 'https://media.giphy.com/media/3GnCVaJAGhfJ6/giphy.gif',
        style: {
            backgroundColor: '#4caf50'
        }
    },
    {
        _id: 'pPZpZp',
        type: 'NoteVideo',
        data: 'https://www.youtube.com/embed/9yVsFL6oMGE',
        style: {
            backgroundColor: '#4caf50'
        }
    },
    {
        _id: 'srups',
        type: 'NoteImg',
        data: 'https://assets.bigcartel.com/product_images/217429087/Primus_Norfolk_Regular.jpg?auto=format&fit=max&h=1000&w=1000',
        style: {
            backgroundColor: '#f3d250'
        }
    },
    {
        _id: 'BeAtl',
        type: 'NoteText',
        data: `It was twenty years ago today
            Sergeant Pepper taught the band to play,
            They've been going in and out of style,
            But they're guaranteed to raise the smile,
            So may I introduce to you,
            The act you've known for all these years,
            Sergeant Pepper's Lonely Hearts Club Band.`,

        style: {
            backgroundColor: '#90ccf4'
        }
    },
    {
        _id: 'parcR',
        type: 'NoteImg',
        data: 'https://www.disccenter.co.il/content/products/prodimage_46385.jpg',
        style: {
            backgroundColor: '#f78888'
        }
    },
    {
        _id: 'igPOP',
        type: 'NoteImg',
        data: 'https://i.pinimg.com/originals/fc/45/67/fc456734ac8265e654aaa4360750c488.jpg',
        style: {
            backgroundColor: '#f3d250'
        }
    },
    {
        _id: 'ww2DD',
        type: 'NoteImg',
        data: 'https://wallpaperaccess.com/full/560725.jpg',
        style: {
            backgroundColor: '#ffa350'
        }
    },
]


const NOTE_KEY = 'notes';



function query(critirea) {
    const params = new URLSearchParams(critirea);
    return HttpService.get(`note?${params}`);
}
function getById(id) {
    return HttpService.get(`note/${id}`);
}
function remove(id) {
    return HttpService.delete(`note/${id}`);
}

async function save(note) {
    let prm;
    if (note._id) prm = HttpService.put(`station/${note._id}`, note);
    else {
        prm = HttpService.post('note', note);
    }
    const res = await prm;
    return res;
}


function getEmptyNote(type) {
    return {
        type,
        data: '',
        style: {
            backgroundColor: '#F8F8FF'
        }
    }
}


export const NoteService = {
    query,
    getById,
    save,
    remove,
    getEmptyNote
}


// function getEmptyCritirea() {
//     return {
//         txt: '',
//         searchIn: '',
//         page: '',
//         sortBy: ''
//     }
// }


