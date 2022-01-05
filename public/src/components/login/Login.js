import { useState } from "react"

// components
import ErrorMessage from "./ErrorMessage"
import Loading from "../Loading"

// Constants
import Constants from "../Constants"
import { connectBackend } from "../connectBackend"

const Login = (props) => {
  // Initialize the initial state and its modifier function
  const [loginData, setLoginData] = useState({
    showPasswordInput: false,
    showError: false,
    username: "",
    password: "",
    errorMessage: "Incorrect Credentials",
    showLoading: false,
  })

  // instantiate the Constants
  const allConstants = Constants()

  // handle when the username / password field is updated
  const handleOnChange = (e) => {
    // update the corresponding state values
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  // handle when the ENTER key is pressed
  const handleKeyPress = (e) => {
    if (e.keyCode == 13 || e.which == 13) {
      // if username is entered enter the password
      if (loginData.username && loginData.password) {
        console.log("Everything is correct Go for verify...", loginData)
        verifyUser()
      } else if (loginData.username) {
        setLoginData({ ...loginData, showPasswordInput: true })
      } else {
        showErrorComponent()
      }
    }
  }

  // verify the logged in user
  const verifyUser = async () => {
    const { username, password, showLoading } = loginData

    // reset the username / password field
    setLoginData({
      ...loginData,
      password: "",
      username: "",
      showLoading: true,
    })

    try {
      const config = {
        method: allConstants.method.POST,
        url: allConstants.login,
        header: allConstants.header,
        data: { username, password },
      }

      const res = await connectBackend(config)
      if (res.data.userId) {
        console.log("user authentication successful", res.data)
        setLoginData({ ...loginData, showLoading: false })
        // send the logged in user's data to parent
        props.onSuccessLogin(res.data)
      } else {
        // show the error message
        showErrorComponent()

        // reload the page
        setTimeout(() => {
          location.reload()
        }, 2000)
      }
    } catch (err) {
      console.log("some error occurred...", err)
    }
  }

  const showErrorComponent = () => {
    // show the error message component
    setLoginData({ ...loginData, showError: true })

    // hide the error message component after 3sec
    setTimeout(() => {
      setLoginData({ ...loginData, showError: false })
    }, 2000)
  }

  const {
    showError,
    showPasswordInput,
    showLoading,
    errorMessage,
    username,
    password,
  } = loginData
  return (
    <div className="login">
      <div className="login-form">
        <div className="login-title">Login</div>
        {showError == true && <ErrorMessage message={errorMessage} />}

        {showLoading == true ? (
          <Loading />
        ) : showPasswordInput == false ? (
          <input
            type="text"
            placeholder="Enter username"
            onChange={handleOnChange}
            onKeyPress={handleKeyPress}
            name="username"
            value={username}
          />
        ) : (
          <input
            type="password"
            placeholder="Enter password"
            onChange={handleOnChange}
            onKeyPress={handleKeyPress}
            name="password"
            value={password}
          />
        )}
      </div>
    </div>
  )
}

export default Login
