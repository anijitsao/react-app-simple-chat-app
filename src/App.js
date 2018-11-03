import React, { Component } from 'react';

// components 
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import Login from './components/Login';

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
    this.onSuccessLogin = this.onSuccessLogin.bind(this)
  }

  onSuccessLogin(userInfo) {
    this.setState({ userInfo, showContent: true }, () => {
      console.log('State is now', this.state)
    })
  }


  render() {
    let { showContent, userInfo } = this.state
    return (
      <div className="container">
      { /* including the Title and other components */ }
      <Header userInfo={userInfo}/>
      { (showContent == false) ? <Login onSuccessLogin={this.onSuccessLogin}/>: <Content /> }
      <Footer />
    </div>
    );
  }
}

export default App;