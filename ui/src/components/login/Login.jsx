import { useState } from "react";

// components
import ErrorMessage from "./ErrorMessage";
import Loading from "../Loading";

// Constants
import Constants from "../../utils/constants.utils";
import { connectBackend } from "../../utils/request.utils";

const Login = (props) => {
  // Initialize the initial state and its modifier function
  const [loginData, setLoginData] = useState({
    showPasswordInput: false,
    showError: false,
    username: "",
    password: "",
    errorMessage: "",
    showLoading: false,
  });

  // instantiate the Constants
  const allConstants = Constants();

  // handle when the username / password field is updated
  const handleOnChange = (e) => {
    // update the corresponding state values
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // handle when the ENTER key is pressed
  const handleKeyPress = (e) => {
    if (e.keyCode == 13 || e.which == 13) {
      // if username is entered enter the password
      if (loginData.username && loginData.password) {
        console.log("Everything is correct Go for verify...", loginData);
        verifyUser();
      } else if (loginData.username) {
        setLoginData({ ...loginData, showPasswordInput: true });
      } else {
        showErrorComponent("Incorrect Credentials");
      }
    }
  };

  // verify the logged in user
  const verifyUser = async () => {
    const { username, password, showLoading } = loginData;

    // reset the username / password field
    setLoginData({
      ...loginData,
      password: "",
      username: "",
      showLoading: true,
    });

    try {
      const config = {
        method: allConstants.method.POST,
        url: allConstants.login,
        headers: allConstants.header,
        body: JSON.stringify({ username, password }),
      };

      const res = await connectBackend(config);
      if (res.data.userId) {
        console.log("user authentication successful", res.data);
        setLoginData({ ...loginData, showLoading: false });
        // send the logged in user's data to parent
        props.onSuccessLogin(res.data);
      } else {
        // show the error message
        showErrorComponent("Incorrect Credentials");

        // reload the page
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    } catch (err) {
      console.log("some error occurred...", err.message);
      showErrorComponent(err.message);
      // reload the page
      setTimeout(() => {
        location.reload();
      }, 2000);
    } finally {
      setLoginData((prevState) => {
        return {
          ...prevState,
          username: "",
          password: "",
          showLoading: false,
        };
      });
    }
  };

  const showErrorComponent = (msg) => {
    // show the error message component
    setLoginData((prevState) => ({
      ...prevState,
      showError: true,
      errorMessage: msg || prevState.errorMessage,
    }));

    // hide the error message component after 2sec
    setTimeout(() => {
      setLoginData((prevState) => ({
        ...prevState,
        showError: false,
        errorMessage: "",
      }));
    }, 2000);
  };

  const {
    showError,
    showPasswordInput,
    showLoading,
    errorMessage,
    username,
    password,
  } = loginData;
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
            onKeyDown={handleKeyPress}
            name="username"
            value={username}
          />
        ) : (
          <input
            type="password"
            placeholder="Enter password"
            onChange={handleOnChange}
            onKeyDown={handleKeyPress}
            name="password"
            value={password}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
