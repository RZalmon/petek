import React from "react";
import { stack as Menu } from "react-burger-menu";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";


import { UtilService } from '../services/UtilService'
import { getUser } from '../actions/UserActions'
import { logout } from '../actions/UserActions'



class BurgerMenu extends React.Component {
  state = {
    menuOpen: false,
    chuckJoke: ''
  };

  async componentDidMount () {    
    let chuckJoke = await UtilService.getRandomChuck()
    this.setState({ chuckJoke });     
   
  }

 async  componentWillUpdate () {
    if(this.props.isClicked && !this.state.menuOpen ) {
      this.setState({ menuOpen: true });
    }

    
  }
   

 
  
  closeMenu = async (ev) => {
    if (ev) {
      this.handleLogout()
    }
    
    this.setState({ menuOpen: false });
    let chuckJoke = await UtilService.getRandomChuck()
    this.setState({ chuckJoke }); 
    };
  
  
  handleLogout =  () => {
     this.props.logout()
     this.props.showNotification('Logged out successfully :)', 'success')


    // this.props.history.push('/signup')
  }


  async handleStateChange(state) {

    this.setState({ menuOpen: state.isOpen });
    // this.props.onOpenMenu(state.isOpen)
  }


  render() {

    const { menuOpen, chuckJoke } = this.state
    const { user } = this.props
    if (!user) return ''

    return (
      <Menu right isOpen={menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
        <NavLink activeClassName="active" exact to="/" onClick={() => this.closeMenu()}>
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/contact" exact onClick={() => this.closeMenu()}>
          Contacts
        </NavLink>
        {user.notifications.length && <span className="notification-count">{user.notifications.length}</span>}
        <NavLink activeClassName="active" to={`/inbox/${user._id}`} exact onClick={() => this.closeMenu()}>
          Inbox
        </NavLink>
        <NavLink activeClassName="active" to="/signup" exact onClick={() => this.closeMenu(logout)}  >
          Logout
        </NavLink>
        <div className="menu-footer">
         <h5>{chuckJoke}</h5>
        {/* <img src={imgObj.imgUrl} alt=""/> */}
        </div>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
  };
};
const mapDispatchToProps = {
  getUser,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BurgerMenu));

