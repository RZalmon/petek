import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser } from '../actions/UserActions';

class HomePage extends Component {
      componentDidMount() {
        if(!this.props.user)this.props.history.push("/signup")
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
                {user.userName && <h2>Hi There {this.capitalize(user.userName)}</h2>}
              </div>
            }
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
