import React from "react";


import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from './pages/ContactPage'
import BoardPage from './pages/BoardPage'
import SignUp from './pages/SignUp'
class RoutePage extends React.Component {
  // async  componentDidMount() {
  //    await this.props.getUser();    
  //     if(!this.isInSignupPage && !this.props.user){
  //       this.props.history.push('/')
  //     }
  //   }

  //   get isInSignupPage(){
  //     return this.props.location.pathname === "/";
  //   }


  //   componentDidUpdate(prevProps, prevState) {
  //     if (
  //       this.props.location !== prevProps.location &&
  //       !this.props.user &&
  //       !this.isInSignupPage
  //     ) {
  //       this.props.history.push("/");
  //     }
  //   }

  render() {
    // if(!this.isInSignupPage && !this.props.user ) return <h1>Nothing for you here</h1>

    return (
      <div className="router-page">
        <main>
          <Switch>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/" exact component={HomePage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/board/:id" component={BoardPage} />
            {/* <Route path="/contact/edit/:id?" component={ContactEdit} /> */}
            {/* <Route path="/contact/:id" component={ContactDetails} /> */}
            {/* <Route path="/statistics" component={Statistics} /> */}
          </Switch>
        </main>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     user: state.user.loggedinUser,
//   };
// };

// const mapDispatchToProps = {
//   getUser,
// };

export default RoutePage;
