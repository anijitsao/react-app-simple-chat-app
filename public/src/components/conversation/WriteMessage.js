import React, { Component } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';


class WriteMessage extends Component {
  // static propTypes = {
  //     className: PropTypes.string,
  // };

  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {
      message: ''
    }
  }


  componentDidMount() {
    let { onNewMessageArrival, onLineRoom } = this.props
    let toAlertRoomIds

    this.socket.on('connect', () => {
      console.log('Socket connected FROM React...')

      toAlertRoomIds = this.props.userInfo.userId

      // emit all the room ids where the user belongs to see him / her as active
      this.socket.emit('onlineUser', toAlertRoomIds)
    });

    // when a user is online
    this.socket.on('onlineUser', (data) => {
      console.log('these rooms should be shown as online', data)
      onLineRoom(data)
    })


    // when a new message arrives
    this.socket.on('message', (data) => {
      console.log('data value ', data)

      // send the newly incoming message to the parent component 
      onNewMessageArrival(data)
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected.. .!!')
    });
  }


  // send the chat message through socket
  sendMessage(event) {
    event.persist()

    // if the ENTER key is pressed emit the message
    if ((event.keyCode == 13 || event.which == 13) && !event.ctrlKey) {


      // define the chat message
      let data = {
        timeSent: new Date().toISOString(),
        msgBody: this.state.message.replace(this.state.message.charAt(this.state.message.length - 1), ""),
        senderId: this.props.userInfo.userId,
        roomId: this.props.selectedRoomId,
        id: uuidv4()
      }

      console.log('the message', data)
      console.log('length of the message', data.msgBody.length)

      // emit the message
      if (data.msgBody.length > 0) {
        this.socket.emit('message', data)
        let { onNewMessageArrival } = this.props
        onNewMessageArrival(data)
      }

      // reset the textarea value 
      this.setState({
        message: ''
      })

    } else if ((event.keyCode == 13 || event.which == 13) && event.ctrlKey) {
      console.log('CTRL pressed')
      this.setState({
        message: event.target.value + "\n"
      })
    }
  }

  handleChange(event) {
    event.persist()

    this.setState({
      message: event.target.value
    })
  }

  render() {

    return (
      <textarea rows="3" className="msg-write-div"
        disabled={this.props.isDisabled}
        onChange={this.handleChange.bind(this)}
        onKeyPress={this.sendMessage.bind(this)}
        value={this.state.message} />
    );
  }
}

export default WriteMessage;