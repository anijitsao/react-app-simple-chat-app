import React, { Component } from 'react';

import uuidv4 from 'uuid/v4'

// component
import Message from './Message'
import WriteMessage from './WriteMessage'

class MessagesPanel extends Component {
  // static propTypes = {
  //   className: PropTypes.string,
  // };

  constructor(props) {
    super(props);

    this.state = {
      messages: [{
          msgBody: 'When are you coming',
          timeSent: '12/09/2018',
          senderId: 'adejhq876',
          id: uuidv4()
        },
        {
          msgBody: '??',
          timeSent: '12/09/2018',
          senderId: 'adejhq876',
          id: uuidv4()

        },
        {
          msgBody: 'I dont know',
          timeSent: 'Yesterday',
          senderId: 'anijit123',
          id: uuidv4()

        },
        {
          msgBody: 'I got the necessary lab copy 4...',
          timeSent: '2:34 PM',
          senderId: 'adejhq876',
          id: uuidv4()

        },
        {
          msgBody: 'When are you <br/> coming ??? ',
          timeSent: '2:35 PM',
          senderId: 'adejhq876',
          id: uuidv4()
        }
      ]
    }
  }

  onNewMessageArrival(data) {
    this.setState((prevState, props) => ({
      messages: [...this.state.messages, { ...data }]
    }))
  }

  render() {
    let { messages } = this.state
    return (
      <div className="message-panel">
        <div className="show-messages">
          {
            messages.map((message) =>{
              return <Message key={message.id} {...message} />
            })
          }
          
        </div>
        <WriteMessage onNewMessageArrival={this.onNewMessageArrival.bind(this)}/>
          
      </div>
    );
  }
}

export default MessagesPanel;