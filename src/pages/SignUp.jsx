import React, { Component } from "react";
import SocketService from '../services/SocketService'

import { signUp } from '../actions/UserActions'
import { getUser } from '../actions/UserActions'
import { connect } from "react-redux";


class SignUp extends Component {

  state = {
    userName: '',
    fullName:'',
    password:''
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
    this.setState({ [name]: value }) 
  };

  onHandleSubmit = async (ev) => {
    ev.preventDefault();
    // const { value, name } = ev.target;
    // this.setState({ [name]: value }, () => {
   await this.props.signUp({...this.state})
    // }),
    this.props.history.push("/")
}




  render() {

    return (
      <div>
        <form onSubmit={this.onHandleSubmit}>
          <input type="text" name="userName" value={this.state.userName} placeholder="UserName" onChange={this.onChangeHandler}/>
          <input type="text" name="fullName" value={this.state.fullName} placeholder="Full Name" onChange={this.onChangeHandler}/>
          <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.onChangeHandler}/>
          <button>SignIn</button>
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
  getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);