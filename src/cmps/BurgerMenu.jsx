import React from "react";
import { stack as Menu } from "react-burger-menu";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";


import { getUser } from '../actions/UserActions'
import { logout } from '../actions/UserActions'



class BurgerMenu extends React.Component {
  state = {
    menuOpen: false,
  };

  closeMenu = (ev) => {
    console.log('ev',ev);
    if(ev){
      this.handleLogout()
    }
    
    this.setState({ menuOpen: false });
  };


  handleLogout = () =>{
    console.log('hi!', this.props);
    this.props.logout()
    this.props.history.push('/signup') 
  }


  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }


  render() {

   const  {menuOpen} = this.state
   const {user} = this.props

    return (
      <Menu right isOpen={menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
        <NavLink activeClassName="active" exact to="/" onClick={() => this.closeMenu()}>
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/contact" exact onClick={() => this.closeMenu()}>
          Contacts
        </NavLink>
        <NavLink activeClassName="active" to="/board/:id" exact onClick={() => this.closeMenu()}>
          BoardPage
        </NavLink>
        {user && <NavLink activeClassName="active" to="/signup" exact onClick={() => this.closeMenu(logout)}  > 
          Logout
        </NavLink>}
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

