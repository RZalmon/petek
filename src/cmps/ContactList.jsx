import React from 'react'
import { Link } from 'react-router-dom';

import ContactPreview from './ContactPreview'
export default (props) => {
    const {onAddFriend} = props
    return (
        <div className="contact-list">
            {props.contacts.map(contact => {
                return (
                    <Link to={'/board/' + contact._id} key={contact._id}>
                        <ContactPreview contact={contact} onAddFriend={onAddFriend} />
                    </Link>
                )
            })}
        </div>
    );
};
