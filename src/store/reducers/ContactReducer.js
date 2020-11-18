const initialState = {
    contacts: [],
    currContact: null,
    filterBy: {term: ''},
};

export default function ContactReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_CONTACTS":
            return { ...state, contacts: action.contacts };
        case "SET_CURR_CONTACT":
            return { ...state, currContact: action.contact };
        case "UPDATE_CONTACT":
            return {
                ...state,
                contacts: state.contacts.map((contact) => {
                    if (contact._id === action.contact._id) return action.contact;
                    return contact;
                }),
            };
        case "DELETE_CONTACT":
            return {
                ...state,
                contacts: state.contacts.filter((contact) => {
                    return contact._id !== action.id;
                }),
            };
        case 'SET_CONTACT_FILTER_BY':
            return { ...state, filterBy: action.filterBy }
        case 'RESET_CONTACT_FILTER_BY':
            return { ...state, filterBy: null }
        default:
            return state;
    }
}
