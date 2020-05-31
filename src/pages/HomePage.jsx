import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser } from '../actions/UserActions';

class HomePage extends Component {
      componentDidMount() {
       const {user} = this.props;
        // if(!user) this.props.history.push(`/signup`);
      }


    capitalize = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
      };

    render() {
        const { user } = this.props;
        
        if(!user) return <h1>Balls?</h1>    

        return (
            <div>
            {user &&
              <div>
                <pre>{user.userName}</pre>
                <h2>Hi There {user.userName}</h2>
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
