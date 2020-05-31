import React from "react";
import { stack as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";

class BurgerMenu extends React.Component {
  state = {
    menuOpen: false,
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }



  render() {

   const  {menuOpen} = this.state

    return (
      <Menu right isOpen={menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
        <NavLink activeClassName="active" exact to="/" onClick={() => this.closeMenu()}>
          Home
        </NavLink>
        {/* <NavLink activeClassName="active" to="/contact" exact onClick={() => this.closeMenu()}>
          Contacts
        </NavLink>
        <NavLink activeClassName="active" to="/statistics" exact onClick={() => this.closeMenu()}>
          Statistics
        </NavLink> */}
      </Menu>
    );
  }
}

export default BurgerMenu;

