import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

const WriteMessage = (props) => {
  // Initialize the initial state and its modifier function
  const [writeMessageData, setWriteMessageData] = useState({ message: "" })

  // initialize the socket
  const socket = props.socket

  // if the ENTER key is pressed emit the message
  const sendMessage = (e) => {
    if ((e.keyCode == 13 || e.which == 13) && !e.ctrlKey) {
      // define the chat message
      const data = {
        timeSent: new Date().toISOString(),
        // msgBody: state.message.replace(state.message.charAt(state.message.length - 1), ""),
        msgBody: writeMessageData.message,
        senderId: props.userInfo.userId,
        roomId: props.selectedRoomId,
        id: uuidv4(),
      }

      // emit the message
      if (data.msgBody.length > 0) {
        socket.emit("message", data)
      }

      // reset the textarea value
      setWriteMessageData({ ...writeMessageData, message: "" })
    } else if ((e.keyCode == 13 || e.which == 13) && e.ctrlKey) {
      console.log("CTRL pressed")
      setWriteMessageData({
        ...writeMessageData,
        message: e.target.value + "\n",
      })
    }
  }

  const handleChange = (e) => {
    setWriteMessageData({ ...writeMessageData, message: e.target.value })
  }

  return (
    <textarea
      rows="3"
      className="msg-write-div"
      disabled={props.isDisabled}
      onChange={handleChange}
      onKeyPress={sendMessage}
      value={writeMessageData.message}
    />
  )
}

export default WriteMessage
