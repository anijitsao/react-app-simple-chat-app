import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client'

// component
import Message from './Message'
import WriteMessage from './WriteMessage'
import Loading from '../Loading'
import { connectBackend } from '../connectBackend'

// Constants
import Constants from '../Constants'

const MessagesPanel = (props) => {

  // Initialize the initial state and its modifier function
  const [messagePanelData, setMessagePanelData] = useState(
    {
      messages: [],
      showLoading: false,
      disableTextArea: true,
      selectedRoomId: ''
    })

  // instantiate the Constants
  const allConstants = Constants()
  const messageEnd = useRef(null)

  // initialize the socket
  const socket = io()
  // when the component is mounted 
  useEffect(() => {
    if (props.selectedRoomId) {
      // load the messages when the nextProps is different from the present one
      loadConversation(props.selectedRoomId)
    }
    scrollToBottom()
  }, [props.selectedRoomId])

  const scrollToBottom = () => {
    messageEnd.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }

  // load the conversation of the selected friend
  const loadConversation = async (id) => {
    setMessagePanelData((prevState) => { return { ...prevState, showLoading: true, disableTextArea: true, selectedRoomId: id } })
    try {
      const config = {
        method: allConstants.method.GET, url: allConstants.getConversation.replace('{id}', id), header: allConstants.header
      }
      const res = await connectBackend(config)

      // set the messages field of the state with the data
      setMessagePanelData((prevState) => { return { ...prevState, showLoading: false, disableTextArea: false, messages: res.data } })
    } catch (err) {
      console.log("Error occurred...", err)
    }
  }

  const onNewMessageArrival = (data) => {
    // if the current message is from the selected room also
    if (data.roomId == messagePanelData.selectedRoomId) {
      setMessagePanelData((prevState) => { return { ...prevState, messages: [...prevState.messages, { ...data }] } })
    }

    // fill the Room info from Socket data
    props.fillRoomInfoFromSocket(data)
    scrollToBottom()
  }

  const { showLoading, disableTextArea } = messagePanelData
  const { userInfo, showMessagePanel } = props
  const messageStyle = (showMessagePanel == true) ? "message-panel" : "message-panel hide-div"

  return (
    <div className={messageStyle}>
      <div className="show-messages">
        {(showLoading == true) ? <Loading />
          :
          messagePanelData.messages.map((message) => {
            return <Message key={message.id} {...message} userInfo={userInfo} />
          })
        }
        <div style={{ float: "left", clear: "both" }} ref={messageEnd}></div>
      </div>
      <WriteMessage
        isDisabled={disableTextArea}
        userInfo={userInfo}
        selectedRoomId={messagePanelData.selectedRoomId}
        socket={props.socket}
        onNewMessageArrival={onNewMessageArrival} />

    </div>
  );
}

export default MessagesPanel;
