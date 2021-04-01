import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const WriteMessage = (props) => {
  // Initialize the initial state and its modifier function
  const [writeMessageData, setWriteMessageData] = useState({ message: '' })

  // initialize the socket
  const socket = io();

  useEffect(() => {
    onConnect()
    onUserOnline()
    onMessageArrival()

    return onDisconnect()

  }, [])

  const onConnect = () => {
    socket.on('connect', () => {
      console.log('Socket connected FROM React...')
      // emit all the room ids where the user belongs to see him / her as active
      socket.emit('onlineUser', props.userInfo.userId)
    });
  }

  // when a user is online
  const onUserOnline = () => {
    socket.on('onlineUser', (data) => {
      console.log('these rooms should be shown as online', data)
      props.onLineRoom(data)
    })
  }

  // when a new message arrives
  const onMessageArrival = () => {
    socket.on('message', (data) => {
      console.log('data value ', data)

      // send the newly incoming message to the parent component 
      props.onNewMessageArrival(data)
    });
  }

  const onDisconnect = () => {
    socket.on('disconnect', () => {
      console.log('disconnected.. .!!')
    });
  }

  // send the chat message through socket
  const sendMessage = (e) => {

    // if the ENTER key is pressed emit the message
    if ((e.keyCode == 13 || e.which == 13) && !e.ctrlKey) {

      // define the chat message
      const data = {
        timeSent: new Date().toISOString(),
        // msgBody: state.message.replace(state.message.charAt(state.message.length - 1), ""),
        msgBody: writeMessageData.message,
        senderId: props.userInfo.userId,
        roomId: props.selectedRoomId,
        id: uuidv4()
      }

      console.log('the message', data)

      // emit the message
      if (data.msgBody.length > 0) {
        socket.emit('message', data)
        props.onNewMessageArrival(data)
      }

      // reset the textarea value 
      setWriteMessageData({ ...writeMessageData, message: '' })
    } else if ((e.keyCode == 13 || e.which == 13) && e.ctrlKey) {
      console.log('CTRL pressed')
      setWriteMessageData({ ...writeMessageData, message: e.target.value + "\n" })
    }
  }

  const handleChange = (e) => {
    setWriteMessageData({ ...writeMessageData, message: e.target.value })
  }

  return (
    <textarea rows="3" className="msg-write-div"
      disabled={props.isDisabled}
      onChange={handleChange}
      onKeyPress={sendMessage}
      value={writeMessageData.message} />
  );
}

export default WriteMessage;
