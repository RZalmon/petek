import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { loadContacts } from '../actions/ContactActions';

import Filter from '../cmps/Filter'
import ContactList from '../cmps/ContactList'

const ContactPage = (props) => {
    const [filterBy, setFilterBy] = useState({ term: '', roomId: '' })
    const { contacts, user } = props



    const onMoveToRoom = (ev, roomId) => {
        ev.stopPropagation()
        props.history.push(`/board/${roomId}`);
    }
    const loadContacts = async () => {
        await props.loadContacts(filterBy);
    };

    const handleKeyPress = () => {
        if (props.contacts.length === 1) {
            let id = props.contacts[0]._id
            props.history.push(`/board/${id}`);
        }
    }

    useEffect(() => {
        loadContacts()
    }, [filterBy])


    return (
        <div>
            {user && <div>
                <Filter
                    filterBy={filterBy}
                    setFilterBy={setFilterBy}
                    moveToContact={handleKeyPress} />
                {!!contacts && <ContactList onMoveToRoom={onMoveToRoom} loggedinUser={user} contacts={user.friends}></ContactList>}
            </div>
            }
        </div>
    )

}




const mapStateToProps = (state) => {
    return {
        contacts: state.contact.contacts,
        user: state.user.loggedinUser,
    };
};

const mapDispatchToProps = {
    loadContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);