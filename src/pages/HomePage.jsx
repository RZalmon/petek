import React, { Component } from 'react'
import { connect } from 'react-redux';
import Avatar from 'react-avatar';

import { getUser,updateUser } from '../actions/UserActions';
import { loadContacts } from '../actions/ContactActions';

import { AvatarEdit } from '../cmps/User/AvatarEdit'
import ContactList from '../cmps/ContactList'
import Filter from '../cmps/Filter'

import SocketService from '../services/SocketService'
import {UserService} from '../services/UserService'
import CloudinaryService from '../../src/services/CloudinaryService'



class HomePage extends Component {
  state = {
    filterBy: { term: '' },
    isLoading: false
  }

  componentDidMount() {
    this.props.getUser()
    if (!this.props.user) this.props.history.push("/signup")
    this.loadContacts()
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
    UserService.updateImgAtContacts(user._id, userImgUrl.secure_url)
    this.setState({ isLoading: false })
  }

  onAddFriend = (friendId) => {
    const {userName, fullName, _id, imgUrl} = this.props.user
    let notification = {
      friendId,
      _id,
      userName,
      fullName,
      type: 'NotificationFriend',
      imgUrl
    }
    SocketService.emit('Add Friend', notification)
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

  onMoveToRoom = (ev, roomId) => {
    console.log(ev);
    ev.stopPropagation()
    this.props.history.push(`/board/${roomId}`);
  }

  capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  render() {
    const { user, contacts } = this.props;
    const { isLoading } = this.state

    return (
      <div>
        {user &&
          <div className="home-page">
            {user.userName && <h2>Hi There {this.capitalize(user.userName)}</h2>}
            <AvatarEdit imgUrl={user.imgUrl} onUploadImg={this.onUploadImg} isLoading={isLoading} />
            <h6>Let's add contacts veze</h6>
            <Filter filterBy={this.state.filterBy} onFilter={this.onFilterHandler} />
            {contacts && <ContactList onMoveToRoom={this.onMoveToRoom} contacts={contacts} onAddFriend={this.onAddFriend} loggedinUser={user} />}
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


