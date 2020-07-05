import React from "react";
import { getUser } from "./actions/UserActions";

import { connect } from "react-redux";

import { Route, Switch, withRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InboxPage from './pages/InboxPage'

import ContactPage from './pages/ContactPage'
import BoardPage from './pages/BoardPage'
import SignUp from './pages/SignUp'

import Loading from './cmps/Loading'
class RoutePage extends React.Component {

  async componentDidMount() {

    await this.props.getUser(); 
    if (!this.isInSignupPage && !this.props.user) {
    this.props.history.push('/signup')
    }
  }

  get isInSignupPage() {
    return this.props.location.pathname === "/signup";
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.location !== prevProps.location &&
      !this.props.user &&
      !this.isInSignupPage
    ) {
      this.props.history.push("/signup");
    }
  }

  render() {
    if (!this.isInSignupPage && !this.props.user) return <Loading />

    return (
      <div className="router-page">
        <main>
          <Switch>
            <Route path="/signup" exact render={(routerProps) => <SignUp {...routerProps} onConnectSocket={this.props.onConnectSocket} />} />
            <Route path="/" exact component={HomePage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/board/:id" component={BoardPage} />
            <Route path="/inbox/:id" exact component={InboxPage} />
          </Switch>
        </main>
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
  getUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RoutePage));
