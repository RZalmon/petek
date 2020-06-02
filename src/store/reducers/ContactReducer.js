const initialState = {
    contacts: [],
    currContact: null
}


export default function ContactReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CONTACTS':            
            return { ...state, contacts: action.contacts }
        case 'SET_CURR_CONTACT':
            return { ...state, currContact: action.contact }
        case 'UPDATE_CONTACT':
            console.log('UPDATE REDUCER')
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                    if (contact._id === action.contact._id) return action.contact;
                    return contact;
                })
            }
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => {
                    return contact._id !== action.id
                })
            }
        case 'ADD_CONTACT':
            console.log('ADD REDUCER')
            return {
                ...state,
                contacts: [...state.contacts, action.contact]
            }
        default:
            return state;
    }
};