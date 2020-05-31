import React, { Component } from 'react'
import { connect } from 'react-redux';

import { loadContacts } from '../actions/ContactActions';


class ContactPage extends Component {

    componentDidMount() {
        this.loadContacts()
    }

    render() {
        return (
            <div>
                <h1>Hello Contact Page</h1>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        contacts: state.contact.contacts,
    };
};

const mapDispatchToProps = {
    loadContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);