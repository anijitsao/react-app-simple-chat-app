import React, { Component } from 'react';
import axios from 'axios'
import uuidv4 from 'uuid/v4'

// component
import Message from './Message'
import WriteMessage from './WriteMessage'

// Constants
import Constants from '../Constants'

class MessagesPanel extends Component {
  // static propTypes = {
  //   className: PropTypes.string,
  // };

  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }

    // instantiate the Constants
    this.allConstants = new Constants()
  }

  // load the messages when the nextProps is different from the present one
  // most important don't forget it 
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedFriendId !== this.props.selectedFriendId)
      this.loadConversation(nextProps.selectedFriendId)
  }

  // load the conversation of the selected friend
  loadConversation(id) {
    let allConstants = this.allConstants
    let selectedFriendId = (id) ? id : 'anijit123-sam432' // this.props.selectedFriendId ||

    console.log('IN MESSAGE PANEL : selected friend id in ', selectedFriendId)

    axios({
        method: allConstants.method.GET,
        url: allConstants.conversation.replace('{id}', selectedFriendId),
        header: allConstants.header
      })
      .then((res) => {
        console.log('conversation is now: ', res.data)

        // set the messages field of the state with the data
        this.setState({ messages: res.data })
      })
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