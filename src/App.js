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
      showContent: false,
      showBackButton: false
    }

    // define not to create the functions every time
    this.onSuccessLogin = this.onSuccessLogin.bind(this)
  }

  // toggle the message panel 
  toggleBackButton(showBackButton) {
    console.log('Status of back button', showBackButton)
    this.setState({ showBackButton })
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
    let { showContent, userInfo, showBackButton } = this.state
    return (
      <div className="container">
        { /* including the Title and other components */}
        <Header userInfo={userInfo} />
        {(showContent == false) ? <Login onSuccessLogin={this.onSuccessLogin} /> : <Content userInfo={userInfo} toggleBackButton={this.toggleBackButton.bind(this)} showBackButton={showBackButton} />}
        <Footer
          showBackButton={showBackButton}
          toggleBackButton={this.toggleBackButton.bind(this, false)} />
      </div>
    );
  }
}

export default App;