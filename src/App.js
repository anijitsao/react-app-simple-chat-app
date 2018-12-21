import React, { Component } from 'react';

// components 
import Header from './components/layout/Header';
import Content from './components/Content';
import Footer from './components/layout/Footer';
import Login from './components/login/Login';

// css
import './css/style.css'


class App extends Component {
  // static propTypes = {
  //   className: PropTypes.string,
  // };

  constructor(props) {
    super(props);

    this.state = {
      showContent: false
    }

    // define not to create the functions every time
    this.onSuccessLogin = this.onSuccessLogin.bind(this)
    this.toggleMessagePanel = this.toggleMessagePanel.bind(this)
  }

  // toggle the message panel 
  toggleMessagePanel() {
    console.log('back button is clicked')
  }
  
  onSuccessLogin(userInfo) {
    this.setState({ userInfo, showContent: true }, () => {
      console.log('State is now', this.state)
    })
  }

  // when error occurred in some lower components
  componentDidCatch() {
    alert('Some Error occurred...!!')
  }
  render() {
    let { showContent, userInfo } = this.state
    return (
      <div className="container">
        { /* including the Title and other components */}
        <Header userInfo={userInfo} />
        {(showContent == false) ? <Login onSuccessLogin={this.onSuccessLogin} /> : <Content userInfo={userInfo} />}
        <Footer toggleMessagePanel={this.toggleMessagePanel} />
      </div>
    );
  }
}

export default App;