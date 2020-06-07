import React, { Component } from 'react'
import { connect } from 'react-redux';

import { loadContacts } from '../actions/ContactActions';

import ContactFilter from '../cmps/ContactFilter'
import ContactList from '../cmps/ContactList'

class ContactPage extends Component {
    state = {
        filterBy: { term: '', roomId: '' }
    }

    componentDidMount() {
        // this.loadContacts()
        console.log(this.state.filterBy)
    }

    loadContacts = async () => {
        await this.props.loadContacts(this.state.filterBy);
    };

    onFilterHandler = (filterBy) => {
        console.log('filter handler', filterBy);
        this.setState((prevState) => {
            // debugger
            return {
                filterBy: {
                    ...prevState.filterBy,
                    ...filterBy,
                },
            };
        }, this.loadContacts);
    };

    handleKeyPress = () => {
        if (this.props.contacts.length === 1) {
            let id = this.props.contacts[0]._id
            this.props.history.push(`/board/${id}`);
        }
    }

    render() {
        const { contacts } = this.props
        return (
            <div>
                <ContactFilter
                    filterBy={this.state.filterBy}
                    onFilter={this.onFilterHandler}
                    moveToContact={this.handleKeyPress}></ContactFilter>
                {contacts.length && <ContactList contacts={contacts}></ContactList>}
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