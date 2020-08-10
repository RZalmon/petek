import React, { useState, useEffect } from "react";
import { MDBInput } from "mdbreact";
import Loading from "../cmps/Loading";

import Swal from 'sweetalert2'

// import SocketService from '../services/SocketService'

import { signUp, login, getUser } from '../actions/UserActions'
import { connect } from "react-redux";
import CloudinaryService from '../../src/services/CloudinaryService'

import { AvatarEdit } from '../cmps/User/AvatarEdit'


const SignupPage = (props) => {
  const [isSignup, setIsSignup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [newUser, setNewUser] = useState({
    userName: '',
    fullName: '',
    password: '',
    imgUrl: '',
  })
  let loggedinUser = null

  const getLoggedinUser = async () => {
    await props.getUser()
    if (props.user) props.history.push('/')
    return props.user
  }



  const resetInput = () => {
    setNewUser({
      userName: '',
      fullName: '',
      password: '',
      imgUrl: '',
    })
  }

  const onUploadImg = async (ev) => {
    setIsLoading(true)
    let userImgUrl = await CloudinaryService.uploadImg(ev)
    setNewUser({ ...newUser, imgUrl: userImgUrl.secure_url })
    setIsLoading(false)
  }

  const connectSockets = (id) => {
    props.onConnectSocket(id)
  }

  const onHandleSubmit = async (ev) => {
    ev.preventDefault();
    setIsDone(true)
    isSignup ? await props.signUp({ ...newUser }) : await props.login({ ...newUser })
     await getLoggedinUser()
    loggedinUser = {...props.user}
    if (!loggedinUser) {
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
      props.history.push("/signup")
      resetInput()
      setIsDone(false)
      return
    }
    props.showNotification('Logged in successfully :)', 'success')
    connectSockets(loggedinUser._id)
    console.log(loggedinUser);
    props.history.push("/")
  }

  useEffect(() => {
    getLoggedinUser()
  }, [])

  return (
    isDone ? <Loading /> :
      <div className="signup-form">
        <form onSubmit={(e) => onHandleSubmit(e)}>
          {isSignup ? <h1>SignUp</h1> : <h1>Login</h1>}
          {isSignup && <AvatarEdit onUploadImg={onUploadImg} imgUrl={newUser.imgUrl} isLoading={isLoading} />}
          {isSignup && <MDBInput label="Full Name" name="fullName" value={newUser.fullName || ''} onChange={e => setNewUser({ ...newUser, fullName: e.target.value })} />}
          <MDBInput label="UserName" type="text" name="userName" value={newUser.userName || ''} onChange={e => setNewUser({ ...newUser, userName: e.target.value })} />
          <MDBInput label="Password" type="password" name="password" value={newUser.password || ''} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
          <button className="signup-login-btn">{isSignup ? 'Sign up' : 'Login'}</button>
          {!isSignup && <h2 >Don't Have an account?<span className="toggle-btn" onClick={() => setIsSignup(!isSignup)}> Sign up!</span></h2>}
          {isSignup && <h2 >Head Back to <span className="toggle-btn" onClick={() => setIsSignup(!isSignup)}>Login</span></h2>}
        </form>
      </div>
  );

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

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);


// import React, { Component } from "react";
// import { MDBInput } from "mdbreact";
// import Loading from "../cmps/Loading";

// import Swal from 'sweetalert2'

// // import SocketService from '../services/SocketService'

// import { signUp, login, getUser } from '../actions/UserActions'
// import { connect } from "react-redux";
// import CloudinaryService from '../../src/services/CloudinaryService'

// import { AvatarEdit } from '../cmps/User/AvatarEdit'


// class SignupPage extends Component {

//   state = {
//     newUser: {
//       userName: '',
//       fullName: '',
//       password: '',
//       imgUrl: '',
//     },
//     isSignUp: false,
//     isLoading: false,
//     isDone: false
//   }

//   componentDidMount() {
//     console.log('hi from signUp', this.state.newUser);

//     this.getLoggedinUser();
//   }

//   getLoggedinUser = async () => {
//     await this.props.getUser()
//     if (this.props.user) this.props.history.push('/')
//   }

//   onChangeHandler = (ev) => {
//     const { value, name } = ev.target;
//     this.setState({
//       newUser: {
//         ...this.state.newUser,
//         [name]: value
//       }
//     })
//   };

//   resetInput = () => {
//     this.setState({
//       newUser: {
//         userName: '',
//         fullName: '',
//         password: '',
//         imgUrl: '',
//       }
//     })
//   }

//   onUploadImg = async (ev) => {
//     this.setState({ isLoading: true })
//     let userImgUrl = await CloudinaryService.uploadImg(ev)
//     this.setState({
//       newUser: {
//         ...this.state.newUser,
//         imgUrl: userImgUrl.secure_url
//       }
//     })
//     this.setState({ isLoading: false })
//   }

//   connectSockets(id) {
//     this.props.onConnectSocket(id)
//   }

//   toggleSignUp = () => {
//     this.setState(prevState => ({
//       isSignUp: !prevState.isSignUp
//     }));
//   }

//   onHandleSubmit = async (ev) => {
//     ev.preventDefault();
//     this.setState({ isDone: true })
//     this.state.isSignUp ?
//       await this.props.signUp({ ...this.state.newUser })
//       : await this.props.login({ ...this.state.newUser })
//     await this.getLoggedinUser();
//     if (!this.props.user) {
//       Swal.fire({
//         title: 'Wrong password or Username.',
//         width: 300,
//         confirmButtonText: "Say what?",
//         confirmButtonColor: "yellow",
//         padding: '1em',
//         background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
//         backdrop: `
//         rgba(0,0,123,0.4)
//         url("https://sweetalert2.github.io/images/nyan-cat.gif")
//         left top
//         no-repeat
//         `
//       })
//       this.props.history.push("/signup")
//       this.resetInput()
//       this.setState({ isDone: false })
//       return
//     }
//     this.connectSockets(this.props.user._id)
//     this.props.history.push("/")

//   }



//   render() {
//     const { isSignUp, isLoading, isDone } = this.state
//     const { imgUrl } = this.state.newUser
//     return (
//       isDone ? <Loading /> :
//         <div className="signup-form">
//           <form onSubmit={this.onHandleSubmit}>
//             {isSignUp ? <h1>SignUp</h1> : <h1>Login</h1>}
//             {isSignUp && <AvatarEdit onUploadImg={this.onUploadImg} imgUrl={imgUrl} isLoading={isLoading} />}
//             {isSignUp && <MDBInput label="Full Name" name="fullName" value={this.state.newUser.fullName || ''} onChange={this.onChangeHandler} />}
//             <MDBInput label="UserName" type="text" name="userName" value={this.state.newUser.userName || ''} onChange={this.onChangeHandler} />
//             <MDBInput label="Password" type="password" name="password" value={this.state.newUser.password || ''} onChange={this.onChangeHandler} />
//             <button className="signup-login-btn">{isSignUp ? 'Sign up' : 'Login'}</button>
//             {!isSignUp && <h2 >Don't Have an account?<span className="toggle-btn" onClick={this.toggleSignUp}> Sign up!</span></h2>}
//             {isSignUp && <h2 >Head Back to <span className="toggle-btn" onClick={this.toggleSignUp}>Login</span></h2>}
//           </form>
//         </div>
//     );
//   }
// }


// const mapStateToProps = (state) => {
//   return {
//     user: state.user.loggedinUser,
//   };
// };

// const mapDispatchToProps = {
//   signUp,
//   getUser,
//   login
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);



// //functional handle submit:
// const onHandleSubmit = async (ev) => {
//   ev.preventDefault();
//   setIsDone(true)
//   isSignup ? await props.signUp({ ...newUser }) : await props.login({ ...newUser })
//   await getLoggedinUser()
//   if (!props.user) {
//     Swal.fire({
//       title: 'Wrong password or Username.',
//       width: 300,
//       confirmButtonText: "Say what?",
//       confirmButtonColor: "yellow",
//       padding: '1em',
//       background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
//       backdrop: `
//       rgba(0,0,123,0.4)
//       url("https://sweetalert2.github.io/images/nyan-cat.gif")
//       left top
//       no-repeat
//       `
//     })
//     props.history.push("/signup")
//     resetInput()
//     setIsDone(false)
//     return
//   }
//   connectSockets(props.user._id)
//   props.history.push("/")
// }