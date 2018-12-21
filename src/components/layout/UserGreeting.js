import React, { Component } from 'react';

// components
import Logout from './Logout'

class UserGreeting extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showLogout: false
    }

    this.showHideLogout = this.showHideLogout.bind(this);
  }

  showHideLogout() {
    this.setState((prevState, props) => ({
      showLogout: !prevState.showLogout
    }))
  }


  render() {

    let { username } = this.props
    let { showLogout } = this.state

    return (
		  <div className="user-info" onClick={this.showHideLogout}>
		    <span className="user-greeting">Hi {username}</span>
      { 
      	(showLogout == true)? <Logout />: '' 
      }
		  </div>
      
    );
  }
};

export default UserGreeting;