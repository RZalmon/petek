import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Noty from 'noty';

import { loadContacts } from '../actions/ContactActions';
import { loadRoomById } from '../actions/RoomActions';
import { updateUser } from '../actions/UserActions';

import { UserService } from '../services/UserService'


import Filter from '../cmps/Filter'
import ContactList from '../cmps/ContactList'

const ContactPage = (props) => {
    const [filterBy, setFilterBy] = useState({ term: '', roomId: '' })
    const { contacts, user } = props


    const onMoveToRoom = async (ev, roomId) => {
        if (!props.history) {
            await props.loadRoomById({ roomId });
            return
        }
        props.history.push(`/room/${roomId}`);
    }

    const loadContacts = async () => {
        await props.loadContacts(filterBy, user);
    };

    const handleKeyPress = () => {
        if (props.contacts.length === 1) {
            let id = props.contacts[0]._id
            props.history.push(`/room/${id}`);
        }
    }

    const showNotification = (friendName, friendId) => {
        //bgc 
        let n = new Noty({
            text: `Remove ${friendName} from your contact list?`,
            layout: 'center',
            theme: 'sunset',
            type: 'alert',
            // theme: 'bootstrap-v4',

            animation: {
                open: 'animated bounceInRight', // Animate.css class names
                close: 'animated bounceOutRight' // Animate.css class names
            },
            buttons: [
                Noty.button('YES', 'btn btn-danger', () => {
                    onDeleteFriend(friendId)
                    n.close();
                }, { id: 'button1', 'data-status': 'ok' }),

                Noty.button('NO', 'btn btn-error', () => {
                    n.close();
                })
            ]
        });
        n.show()
    }

    const onDeleteFriend = (friendId) => {
        let friendIdx = user.friends.findIndex(friend => friend._id === friendId)
        user.friends.splice(friendIdx, 1)
        props.updateUser(user)
        UserService.updateFriend(user._id, friendId)
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
                {!!contacts && <ContactList showNotification={showNotification} onDeleteFriend={onDeleteFriend} onMoveToRoom={onMoveToRoom} loggedinUser={user} contacts={user.friends} />}
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
    loadRoomById,
    updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);