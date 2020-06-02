import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser } from '../actions/UserActions';
import { UserService } from '../services/UserService';
import {AvatarEdit} from '../cmps/User/AvatarEdit'
import ContactFilter from '../cmps/ContactFilter'
import { loadContacts } from '../actions/ContactActions';
import ContactList from '../cmps/ContactList'




class HomePage extends Component {
  state = {
    filterBy: { term: '' }
}
  componentDidMount() {
    if (!this.props.user) this.props.history.push("/signup")
  }
  loadContacts = async () => {
    console.log(this.state.filterBy);

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

    //TODO? IF !FILTER BY return 
    console.log(filterBy);
    
};

  capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  render() {
    const { user,contacts } = this.props;

    return (
      <div>
        {user &&
          <div>
            {user.userName && <h2>Hi There {this.capitalize(user.userName)}</h2>}
            <AvatarEdit imgUrl={user.imgUrl}/>
            <h6>Let's add contacts veze</h6>
            <ContactFilter filterBy={this.state.filterBy} onFilter={this.onFilterHandler}></ContactFilter>
            {contacts && <ContactList contacts={contacts}/>}
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
    contacts: state.contact.contacts,

  };
};

const mapDispatchToProps = {
  getUser,
  loadContacts
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);


