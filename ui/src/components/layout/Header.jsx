// components
import Title from "./Title"
import UserGreeting from "./UserGreeting"

export default ({ userInfo }) => {
  return (
    <div className="header">
      <Title />
      {userInfo && <UserGreeting username={userInfo.name} />}
    </div>
  )
}
