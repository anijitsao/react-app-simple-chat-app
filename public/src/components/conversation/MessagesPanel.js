import { useEffect, useRef, useState } from 'react';

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
      disableTextArea: true
    })

  // instantiate the Constants
  const allConstants = Constants()
  const messageEnd = useRef(null)

  // when the component is mounted 
  useEffect(() => {
    if (props.selectedRoomId) {
      // load the messages when the nextProps is different from the present one
      loadConversation(props.selectedRoomId)
    }
    scrollToBottom()
  }, [props.selectedRoomId])

  // when the component is updated
  // componentDidUpdate() {
  //   scrollToBottom()
  // }

  const scrollToBottom = () => {
    messageEnd.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }

  // load the conversation of the selected friend
  const loadConversation = async (id) => {
    setMessagePanelData({ ...messagePanelData, showLoading: true, disableTextArea: true })
    const selectedRoomId = (id) ? id : 'anijit123-sam432'

    try {
      const config = {
        method: allConstants.method.GET, url: allConstants.getConversation.replace('{id}', selectedRoomId), header: allConstants.header
      }
      const res = await connectBackend(config)

      // set the messages field of the state with the data
      setMessagePanelData({ ...messagePanelData, messages: res.data, showLoading: false, disableTextArea: false })
    } catch (err) {
      console.log("Error occurred...", err)
    }
  }

  const onNewMessageArrival = (data) => {
    // if the current message is from the selected room also
    if (data.roomId == props.selectedRoomId) {
      setMessagePanelData({ ...messagePanelData, messages: [...messagePanelData.messages, { ...data }] })
    }

    // fill the Room info from Socket data
    props.fillRoomInfoFromSocket(data)
  }

  const onLineRoom = (roomsOnline) => {
    console.log('Online rooms are', roomsOnline)
    props.notifyOnlineRooms(roomsOnline)
  }

  const { messages, showLoading, disableTextArea } = messagePanelData
  const { userInfo, selectedRoomId, showMessagePanel } = props
  const messageStyle = (showMessagePanel == true) ? "message-panel" : "message-panel hide-div"

  return (
    <div className={messageStyle}>
      <div className="show-messages">
        {(showLoading == true) ? <Loading />
          :
          messages.map((message) => {
            return <Message key={message.id} {...message} userInfo={userInfo} />
          })
        }
        <div style={{ float: "left", clear: "both" }} ref={messageEnd}></div>
      </div>
      <WriteMessage
        isDisabled={disableTextArea}
        userInfo={userInfo}
        selectedRoomId={selectedRoomId}
        onLineRoom={onLineRoom}
        onNewMessageArrival={onNewMessageArrival.bind(this)} />

    </div>
  );
}

export default MessagesPanel;
