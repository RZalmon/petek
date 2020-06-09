import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getUser } from '../actions/UserActions';
import { updateUser } from '../actions/UserActions';
import { loadContacts } from '../actions/ContactActions';

import {AvatarEdit} from '../cmps/User/AvatarEdit'
import ContactList from '../cmps/ContactList'
import ContactFilter from '../cmps/ContactFilter'

import SocketService from '../services/SocketService'
import CloudinaryService from '../../src/services/CloudinaryService'



class HomePage extends Component {
  state = {
    filterBy: { term: '' },
    isLoading: false
  }
  componentDidMount() {
    // SocketService.setup()
    if (!this.props.user) this.props.history.push("/signup")
    console.log('HomePage USER', this.props.user);
  }
  loadContacts = async () => {
    await this.props.loadContacts(this.state.filterBy);
  };

  onUploadImg = async (ev) => {
    let user = this.props.user
    this.setState({ isLoading: true })
    let userImgUrl = await CloudinaryService.uploadImg(ev)
    const updatedUser = Object.assign(user, { imgUrl: userImgUrl.secure_url })
    this.props.updateUser(updatedUser)
    this.setState({ isLoading: false })
  }

onAddFriend = (ev,friendId) => {
  console.log('bo kapara 2');
  
  ev.preventDefault()
  const {user} = this.props
  SocketService.emit('Add Friend', {friendId, _id: user._id, userName:user.userName, fullName:user.fullName, type:'NotificationFriend',imgUrl:user.imgUrl })
}

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

  capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  render() {
    const { user, contacts } = this.props;
    const { isLoading } = this.state

    return (
      <div>
        {user &&
          <div>
            {user.userName && <h2>Hi There {this.capitalize(user.userName)}</h2>}
            <AvatarEdit imgUrl={user.imgUrl} onUploadImg={this.onUploadImg} isLoading={isLoading} />
            <h6>Let's add contacts veze</h6>
            <ContactFilter filterBy={this.state.filterBy} onFilter={this.onFilterHandler} ></ContactFilter>
            {contacts && <ContactList contacts={contacts} onAddFriend={this.onAddFriend} loggedinUser={user} />}
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
  updateUser,
  loadContacts,

};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);


