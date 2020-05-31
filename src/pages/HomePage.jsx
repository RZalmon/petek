import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser } from '../actions/UserActions';

class HomePage extends Component {
    render() {
        return (
            <div>
                <h1>Home Page</h1>
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
