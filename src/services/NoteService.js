var demoNotes = [
    {
        id: 'd4a5x',
        type: 'noteText',
        data: 'Free I feel free like you promised I\d be',
        style: {
            backgroundColor: '#90ccf4'
        }
    },
    {
        id: 'ZzZzZ',
        type: 'noteVideo',
        data: 'https://www.youtube.com/embed/aYDfwUJzYQg',
        style: {
            backgroundColor: '#4caf50'
        }
    },
    {
        id: 'XxXxX',
        type: 'noteImg',
        data: 'https://media.giphy.com/media/PDmXIQru17Udy/giphy.gif',
        style: {
            backgroundColor: '#f3d250'
        }
    },
    {
        id: 'AaAaA',
        type: 'noteTodos',
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
        id: 'Babab',
        type: 'noteText',
        data: 'Rak TB!',
        style: {
            backgroundColor: '#4caf50'
        }
    },
    {
        id: 'C3PO1',
        type: 'noteImg',
        data: 'https://www.myabandonware.com/media/screenshots/j/jazz-jackrabbit-2-4dm/jazz-jackrabbit-2_3.jpg',
        style: {
            backgroundColor: '#ffa350'
        }
    },
    {
        id: 'R2D21',
        type: 'noteImg',
        data: 'https://media.giphy.com/media/l11IVhXPESQqu0z3GQ/giphy.gif',
        style: {
            backgroundColor: '#f78888'
        }
    },
    {
        id: '12d2r',
        type: 'noteImg',
        data: 'https://media.giphy.com/media/mi6DsSSNKDbUY/giphy.gif',
        style: {
            backgroundColor: '#ffa350'
        }
    },
    {
        id: 'SPura',
        type: 'noteTodos',
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
        id: 'SPurs',
        type: 'noteImg',
        data: 'https://media.giphy.com/media/3GnCVaJAGhfJ6/giphy.gif',
        style: {
            backgroundColor: '#4caf50'
        }
    },
    {
        id: 'pPZpZp',
        type: 'noteVideo',
        data: 'https://www.youtube.com/embed/9yVsFL6oMGE',
        style: {
            backgroundColor: '#4caf50'
        }
    },
    {
        id: 'srups',
        type: 'noteImg',
        data: 'https://assets.bigcartel.com/product_images/217429087/Primus_Norfolk_Regular.jpg?auto=format&fit=max&h=1000&w=1000',
        style: {
            backgroundColor: '#f3d250'
        }
    },
    {
        id: 'BeAtl',
        type: 'noteText',
        data: `It was twenty years ago today
            Sergeant Pepper taught the band to play,
            They\'ve been going in and out of style,
            But they\'re guaranteed to raise the smile,
            So may I introduce to you,
            The act you\'ve known for all these years,
            Sergeant Pepper\'s Lonely Hearts Club Band.`,

        style: {
            backgroundColor: '#90ccf4'
        }
    },
    {
        id: 'parcR',
        type: 'noteImg',
        data: 'https://www.disccenter.co.il/content/products/prodimage_46385.jpg',
        style: {
            backgroundColor: '#f78888'
        }
    },
    {
        id: 'igPOP',
        type: 'noteImg',
        data: 'https://i.pinimg.com/originals/fc/45/67/fc456734ac8265e654aaa4360750c488.jpg',
        style: {
            backgroundColor: '#f3d250'
        }
    },
    {
        id: 'ww2DD',
        type: 'noteImg',
        data: 'https://wallpaperaccess.com/full/560725.jpg',
        style: {
            backgroundColor: '#ffa350'
        }
    },
]

import { UtilService } from './UtilService'
import { StorageService } from './StorageService'

const CONTACT_KEY = 'contacts';

var contacts = [
    {
        "_id": "aa56640269f443a5d64b32ca",
        "fullName": "Eyal Golan",
        "userName": "Eyalush",
        "friends": []
    },
    {
        "_id": "ba56640269f443a5d64b32cb",
        "fullName": "Omer Adam",
        "userName": "Omerush",
        "friends": []
    },
    {
        "_id": "ca56640269f443a5d64b32cc",
        "fullName": "Zohar Argov",
        "userName": "Ha Melech",
        "friends": []
    }
];

function sort(arr) {
    return arr.sort((a, b) => {
        if (a.userName.toLocaleLowerCase() < b.userName.toLocaleLowerCase()) {
            return -1;
        }
        if (a.userName.toLocaleLowerCase() > b.userName.toLocaleLowerCase()) {
            return 1;
        }

        return 0;
    })
}

function getContacts(filterBy = null) {
    return new Promise((resolve, reject) => {
        var contactsToReturn = StorageService.load(CONTACT_KEY);
        if (!contactsToReturn || !contactsToReturn.length) {
            contactsToReturn = [...contacts]
            StorageService.save(CONTACT_KEY, contactsToReturn)
        }
        contacts = [...contactsToReturn]
        if (filterBy && filterBy.term) {
            contactsToReturn = filter(filterBy.term)
        }
        contactsToReturn ? resolve(sort(contactsToReturn)) : reject(`Contacts not found!`)
    })
}

function getContactById(id) {
    return new Promise((resolve, reject) => {
        const contact = contacts.find(contact => contact._id === id)
        contact ? resolve(contact) : reject(`Contact id ${id} not found!`)
    })
}

function deleteContact(id) {
    return new Promise((resolve, reject) => {
        const index = contacts.findIndex(contact => contact._id === id)
        if (index !== -1) {
            contacts.splice(index, 1)
        }
        StorageService.save(CONTACT_KEY, contacts)
        resolve(contacts)
    })
}

function _updateContact(contact) {
    console.log('edit contact')
    return new Promise((resolve, reject) => {
        const index = contacts.findIndex(c => contact._id === c._id)
        if (index !== -1) {
            contacts[index] = contact
        }
        console.log('(edit)Contacts after replace ', contacts)
        StorageService.save(CONTACT_KEY, contacts)
        resolve(contact)
    })
}

function _addContact(contact) {
    console.log('add contact')
    return new Promise((resolve, reject) => {
        contact._id = UtilService.makeId()
        contacts.push(contact)
        console.log('(ADD)Contacts after push ', contacts)
        StorageService.save(CONTACT_KEY, contacts)
        resolve(contact)
    })
}

function saveContact(contact) {
    console.log('save contact', contact)
    return contact._id ? _updateContact(contact) : _addContact(contact)
}

function getEmptyContact() {
    return {
        fullName: '',
        userName: '',
    }
}

function filter(term) {
    term = term.toLocaleLowerCase()
    return contacts.filter(contact => {
        return contact.userName.toLocaleLowerCase().includes(term) ||
            contact.fullName.toLocaleLowerCase().includes(term)
    })
}

export const ContactService = {
    getContacts,
    getContactById,
    deleteContact,
    saveContact,
    getEmptyContact
}
