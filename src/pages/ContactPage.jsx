import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { loadContacts } from '../actions/ContactActions';
import { loadRoomById } from '../actions/RoomActions';

import Filter from '../cmps/Filter'
import ContactList from '../cmps/ContactList'

const ContactPage = (props) => {
    const [filterBy, setFilterBy] = useState({ term: '', roomId: '' })
    const { contacts, user } = props



    const onMoveToRoom = async (ev,roomId) => {   
       
        if(!props.history){
        await props.loadRoomById({ roomId });
        return
        } 
        props.history.push(`/room/${roomId}`);
    }

    const loadContacts = async () => {
        console.log('contact page loading contacts');
        await props.loadContacts(filterBy, user);
    };

    const handleKeyPress = () => {
        if (props.contacts.length === 1) {
            let id = props.contacts[0]._id
            props.history.push(`/room/${id}`);
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
                {!!contacts && <ContactList onMoveToRoom={onMoveToRoom} loggedinUser={user} contacts={contacts.length ? contacts : user.friends}></ContactList>}
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
    loadRoomById
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);