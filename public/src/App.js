import { useState } from "react"

// components
import Header from "./components/layout/Header"
import Content from "./components/Content"
import Footer from "./components/layout/Footer"
import Login from "./components/login/Login"

// css
import "./css/style.css"

const App = () => {
  // Initialize the initial state and its modifier function
  const [appData, setAppData] = useState({
    showContent: false,
    showBackButton: false,
  })

  // toggle the message panel
  const toggleBackButton = (showBackButton) => {
    setAppData({ ...appData, showBackButton })
  }

  const onSuccessLogin = (userInfo) => {
    setAppData({ ...appData, userInfo, showContent: true })
  }

  const { showContent, userInfo, showBackButton } = appData
  return (
    <div className="container">
      {/* including the Title and other components */}
      <Header userInfo={userInfo} />
      {showContent == false ? (
        <Login onSuccessLogin={onSuccessLogin} />
      ) : (
        <Content
          userInfo={userInfo}
          showBackButton={showBackButton}
          toggleBackButton={toggleBackButton}
        />
      )}
      <Footer
        showBackButton={showBackButton}
        toggleBackButton={toggleBackButton}
      />
    </div>
  )
}

export default App
