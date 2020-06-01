import React, { Component } from "react";
import Swal from 'sweetalert2'

// import SocketService from '../services/SocketService'

import { signUp } from '../actions/UserActions'
import { login } from '../actions/UserActions'
import { getUser } from '../actions/UserActions'
import { connect } from "react-redux";


class SignUp extends Component {

  state = {
    newUser : {
      userName: '',
      fullName:'',
      password:''
    },
    isSignUp:false
  }

  componentDidMount() {
    
    
    this.getLoggedinUser();    
  }

  getLoggedinUser = () => {
    
     this.props.getUser()
    
    console.log('here?', this.props.user);
    if (this.props.user && this.props.user !== 'err') this.props.history.push('/') 
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
        userName:'',
        password: ''
      }
  })
  }

  toggleSignUp = () =>{
    this.setState(prevState => ({
      isSignUp: !prevState.isSignUp
    }));
  }

  onHandleSubmit = async (ev) => {
    ev.preventDefault();
      this.state.isSignUp ? 
      await this.props.signUp({...this.state.newUser})
      :await this.props.login({...this.state.newUser})
       await this.getLoggedinUser();
    if(!this.props.user) {      
      Swal.fire({
        title: 'Wrong password or Username.',
        width: 300,
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
    
    this.props.history.push("/")
}




  render() {
    const {isSignUp} = this.state
    return (
      <div>
        <form onSubmit={this.onHandleSubmit}>
          {!isSignUp && <h1>Login</h1>}
          {isSignUp && <h1>SignUp</h1>}
          {isSignUp &&<input type="text" name="fullName" value={this.state.newUser.fullName || ''} placeholder="Full Name" onChange={this.onChangeHandler}/>}
          <input type="text" name="userName" value={this.state.newUser.userName || ''} placeholder="UserName" onChange={this.onChangeHandler}/>
          <input type="password" name="password" value={this.state.newUser.password || ''} placeholder="Password" onChange={this.onChangeHandler}/>
          <button>Login</button>
          {!isSignUp && <h2 onClick ={this.toggleSignUp}>Don't Have an account? Sign Up!</h2>}
          {isSignUp && <h2 onClick ={this.toggleSignUp}>Head Back to Login</h2>}
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