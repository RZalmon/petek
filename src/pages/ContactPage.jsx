import React, { Component } from 'react'
import { connect } from 'react-redux';

import { loadContacts } from '../actions/ContactActions';

import Filter from '../cmps/Filter'
import ContactList from '../cmps/ContactList'

class ContactPage extends Component {
    state = {
        filterBy: { term: '', roomId: '' }
    }

    componentDidMount() {
        console.log('balls');
        // this.loadContacts()
    }
    

    onMoveToRoom = (ev,roomId) => {   
        console.log(ev);    
        ev.stopPropagation()
        this.props.history.push(`/board/${roomId}`);
    }
    loadContacts = async () => {
        await this.props.loadContacts(this.state.filterBy);
    };

    onFilterHandler = (filterBy) => {
        this.setState((prevState) => {
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
        const { contacts, user } = this.props
        return (
            <div>
                {user && <div>
                    <Filter
                        filterBy={this.state.filterBy}
                        onFilter={this.onFilterHandler}
                        moveToContact={this.handleKeyPress}/>
                    {!!contacts && <ContactList onMoveToRoom={this.onMoveToRoom} loggedinUser={user} contacts={user.friends}></ContactList>}
                </div>
                }
            </div>
        )
    }
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