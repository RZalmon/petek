import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser } from '../actions/UserActions';

class HomePage extends Component {
      componentDidMount() {
       const {user} = this.props;
        console.log(this.props);
        if(!user) this.props.history.push(`/signup`);
      }


    capitalize = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
      };

    render() {
        const { user } = this.props;

        return (
            <div>
            {user &&
              <div>
                <pre>{user.userName}</pre>
                <h2>Hi There {this.capitalize(user.userName)}</h2>
              </div>
            }
            <h1>balss</h1>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.loggedinUser,
    };
};

const mapDispatchToProps = {
    getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
