import { useState } from "react"

// components
import Logout from "./Logout"

const UserGreeting = (props) => {
  // Initialize initial state and its modifier function
  const [logoutData, setLogoutData] = useState({ showLogout: false })

  const showHideLogout = () => {
    setLogoutData({ ...logoutData, showLogout: !logoutData.showLogout })
  }

  const { username } = props
  const { showLogout } = logoutData

  return (
    <div className="user-info" onClick={showHideLogout}>
      <span className="user-greeting">Hi {username}</span>
      {showLogout == true && <Logout />}
    </div>
  )
}

export default UserGreeting
