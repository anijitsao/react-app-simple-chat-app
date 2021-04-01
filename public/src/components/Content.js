import { useEffect, useState } from 'react';

// components
import RoomPanel from './rooms/RoomPanel'
import MessagesPanel from './conversation/MessagesPanel'

const Content = (props) => {

  // Initialize the initial data and its modifier
  const [contentData, setContentData] = useState(
    {
      showMessagePanel: true,
      showRoomPanel: true,
      onlineRooms: []
    })

  useEffect(() => {
    toggleMessagePanel(false, true)
  }, [])

  const toggleMessagePanel = (showMessagePanel, showRoomPanel) => {
    if (window.innerWidth < 500) {
      setContentData({ ...contentData, showMessagePanel, showRoomPanel })
      if (showMessagePanel == true) {
        props.toggleBackButton(true)
      }
    }
  }

  const setSelectedRoomId = (id) => {
    toggleMessagePanel(true, false)
    // set in the corresponding variable
    setContentData({ ...contentData, selectedRoomId: id })
  }

  const fillRoomInfoFromSocket = (message) => {
    setContentData({ ...contentData, newMessageFromSocket: message })
  }

  const notifyOnlineRooms = (rooms) => {
    setContentData({ ...contentData, onlineRooms: rooms })
  }

  const { userInfo } = props
  const { showMessagePanel, showRoomPanel, selectedRoomId, newMessageFromSocket, onlineRooms } = contentData

  if (window.innerWidth < 500 && props.showBackButton == false) {
    showMessagePanel = false
    showRoomPanel = true
  }

  return (
    <div className="content">
      <RoomPanel
        showRoomPanel={showRoomPanel}
        userInfo={userInfo}
        onlineRooms={onlineRooms}
        newMessageFromSocket={newMessageFromSocket}
        setSelectedRoomId={setSelectedRoomId} />

      <MessagesPanel
        showMessagePanel={showMessagePanel}
        selectedRoomId={selectedRoomId}
        fillRoomInfoFromSocket={fillRoomInfoFromSocket}
        notifyOnlineRooms={notifyOnlineRooms}
        userInfo={userInfo} />
    </div>
  );
};

export default Content;
