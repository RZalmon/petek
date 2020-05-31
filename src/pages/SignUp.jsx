import React, { Component } from "react";

import {signUp} from '../../actions/UserActions'
// import {getUser} from '../../actions/UserActions'
// import { connect } from "react-redux";


class SignUp extends Component {

  state ={
    userName: ''
  }


 componentDidMount() {      
  this.getLoggedinUser();
  }

  getLoggedinUser = async  () => {
   await this.props.getUser()
   if(this.props.user) this.props.history.push('/home')
  }

  onHandleChange = (e) => {
    this.setState({
      userName:e.target.value
    })
  };

  onHandleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state.userName)
    this.props.history.push("/home");
  };

  render() {

    return (
      <div>
        <form onSubmit={this.onHandleSubmit}>
          <input type="text" onChange={this.onHandleChange} />
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