import React, { Component } from 'react';


// component
import Message from './Message'

class MessagesPanel extends Component {
  // static propTypes = {
  //   className: PropTypes.string,
  // };

  constructor(props) {
    super(props);

    this.state = {
      messages: [
      {
        msgBody: 'When are you coming',
        
      }
      ]
    }
  }

  render() {
    return (
    	<div className="message-panel">
        <div className="show-messages">
          
          
        </div>
        <textarea name="" id="" rows="3" className="msg-write-div"></textarea>
      </div>
    );
  }
}

export default MessagesPanel;