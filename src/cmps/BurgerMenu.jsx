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
    if (ev) {
      this.handleLogout()
    }
    this.setState({ menuOpen: false });
  };


  handleLogout = async () => {
    await this.props.logout()
    this.props.history.push('/signup')
  }


  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }


  render() {

    const { menuOpen } = this.state
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
        <NavLink activeClassName="active" to="/board/:id" exact onClick={() => this.closeMenu()}>
          BoardPage
        </NavLink>
            <span className="notification-count">{user.notifications.length}</span>
        <NavLink activeClassName="active" to={`/inbox/${user._id}`} exact onClick={() => this.closeMenu()}>
          Inbox
        </NavLink>
        <NavLink activeClassName="active" to="/signup" exact onClick={() => this.closeMenu(logout)}  >
          Logout
        </NavLink>
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

