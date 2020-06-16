import { UtilService } from './UtilService'
import { StorageService } from './StorageService'
import { HttpService } from './HttpService.js'


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

// function query(filterBy = null) {
//     return new Promise((resolve, reject) => {
//         var contactsToReturn = StorageService.load(CONTACT_KEY);
//         if (!contactsToReturn || !contactsToReturn.length) {
//             contactsToReturn = [...contacts]
//             StorageService.save(CONTACT_KEY, contactsToReturn)
//         }
//         contacts = [...contactsToReturn]
//         if (filterBy && filterBy.term) {
//             contactsToReturn = filter(filterBy.term)
//         }
//         contactsToReturn ? resolve(sort(contactsToReturn)) : reject(`Contacts not found!`)
//     })
// }
function query(filterBy) {
    // if (!filterBy.term) return []
    const queryParams = new URLSearchParams();
    if (filterBy) {
        for (const property in filterBy) {
            if (filterBy[property]) {
                queryParams.set(property, filterBy[property])
            }
        }
        return HttpService.get(`user?${queryParams}`);
    }
    // return HttpService.get('user');
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
    return new Promise((resolve, reject) => {
        const index = contacts.findIndex(c => contact._id === c._id)
        if (index !== -1) {
            contacts[index] = contact
        }
        // console.log('(edit)Contacts after replace ', contacts)
        StorageService.save(CONTACT_KEY, contacts)
        resolve(contact)
    })
}

function _addContact(contact) {
    // console.log('add contact')
    return new Promise((resolve, reject) => {
        contact._id = UtilService.makeId()
        contacts.push(contact)
        // console.log('(ADD)Contacts after push ', contacts)
        StorageService.save(CONTACT_KEY, contacts)
        resolve(contact)
    })
}

function saveContact(contact) {
    // console.log('save contact', contact)
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
    query,
    getContactById,
    deleteContact,
    saveContact,
    getEmptyContact
}
