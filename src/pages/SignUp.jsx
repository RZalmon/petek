import React, { Component } from "react";
import { MDBInput } from "mdbreact";

import Swal from 'sweetalert2'

// import SocketService from '../services/SocketService'

import { signUp } from '../actions/UserActions'
import { login } from '../actions/UserActions'
import { getUser } from '../actions/UserActions'
import { connect } from "react-redux";
import CloudinaryService from '../../src/services/CloudinaryService'

import { AvatarEdit } from '../cmps/User/AvatarEdit'


class SignUp extends Component {

  state = {
    newUser: {
      userName: '',
      fullName: '',
      password: '',
      imgUrl: '',
    },
    isSignUp: false,
    isLoading: false
  }

  componentDidMount() {
    this.getLoggedinUser();
  }

  getLoggedinUser = async () => {
    await this.props.getUser()
    if (this.props.user) this.props.history.push('/')
  }

  onChangeHandler = (ev) => {
    const { value, name } = ev.target;
    this.setState({
      newUser: {
        ...this.state.newUser,
        [name]: value
      }
    })
  };

  resetInput = () => {
    this.setState({
      newUser: {
        userName: '',
        password: ''
      }
    })
  }

  onUploadImg = async (ev) => {
    this.setState({ isLoading: true })
    let userImgUrl = await CloudinaryService.uploadImg(ev)
    this.setState({
      newUser: {
        ...this.state.newUser,
        imgUrl: userImgUrl.secure_url
      }
    })
    this.setState({ isLoading: false })
  }

  connectSockets(id) {
    this.props.onConnectSocket(id)
  }

  toggleSignUp = () => {
    this.setState(prevState => ({
      isSignUp: !prevState.isSignUp
    }));
  }

  onHandleSubmit = async (ev) => {
    ev.preventDefault();

    this.state.isSignUp ?
      await this.props.signUp({ ...this.state.newUser })
      : await this.props.login({ ...this.state.newUser })
    await this.getLoggedinUser();
    if (!this.props.user) {
      Swal.fire({
        title: 'Wrong password or Username.',
      width: 300,
        confirmButtonText: "Say what?",
        confirmButtonColor: "yellow",
        padding: '1em',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
        `
      })
      this.props.history.push("/signup")
      this.resetInput()
      return
    }
    this.connectSockets(this.props.user._id)
    this.props.history.push("/")
  }



  render() {
    const { isSignUp, isLoading } = this.state
    const { imgUrl } = this.state.newUser
    return (
      <div className="signup-form">
        <form onSubmit={this.onHandleSubmit}>
          {!isSignUp && <h1>Login</h1>}
          {isSignUp && <h1>SignUp</h1>}
          {isSignUp && <AvatarEdit onUploadImg={this.onUploadImg} imgUrl={imgUrl} isLoading={isLoading} />}
          {isSignUp && <MDBInput label="Full Name" name="fullName" value={this.state.newUser.fullName || ''} onChange={this.onChangeHandler} />}
          <MDBInput label="UserName" type="text" name="userName" value={this.state.newUser.userName || ''} onChange={this.onChangeHandler} />
          <MDBInput label="Password" type="password" name="password" value={this.state.newUser.password || ''} onChange={this.onChangeHandler} />
          <button>{isSignUp ? 'SignUp' : 'Login'}</button>
          {!isSignUp && <h2 onClick={this.toggleSignUp}>Don't Have an account? Sign Up!</h2>}
          {isSignUp && <h2 onClick={this.toggleSignUp}>Head Back to Login</h2>}
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
  };
};

const mapDispatchToProps = {
  signUp,
  getUser,
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);