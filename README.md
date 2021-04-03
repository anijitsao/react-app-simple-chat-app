# react-app-simple-chat-app

A Simple Chat Application using [React JS](https://reactjs.org/docs/getting-started.html), a JavaScript library to make awesome UI by Facebook, [Node JS](https://nodejs.org/en/docs), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/).

This application uses [React JS](https://reactjs.org/docs/getting-started.html) component oriented UI creation paradigm. All components are written in [JSX](https://reactjs.org/docs/jsx-in-depth.html) and ES6 style and are
combined to get a single build for production purpose using [Webpack 5](https://webpack.js.org/concepts/). 

ES6 `module` creation along with `import /export` is used. [Babel](https://babeljs.io/docs/en/babel-preset-react) is used to *transpile* all [JSX](https://reactjs.org/docs/jsx-in-depth.html) code to vanilla JavaScript code. To install all the dependecies `npm` is used.

Back end is implemented using [Node JS](https://nodejs.org/en/docs), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/). [Atlas](https://www.mongodb.com/cloud/atlas), the *Cloud* version of [MongoDB](https://docs.mongodb.com/) is used. Real time communication is done using [Socket.io](https://www.npmjs.com/package/socket.io)


For UI creation [HTML5](https://www.w3schools.com/html/html5_intro.asp) and [CSS3](https://www.w3schools.com/css/) are used. [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout), the new feature of [CSS3](https://www.w3schools.com/css/) is used for layout creation purpose.

This is a *responsive web application* for viewing in both Mobile and Desktop.


## Features
- Code is rewritten with [React JS 17](https://reactjs.org/docs/getting-started.html) and [Node JS 15](https://nodejs.org/en/docs/)
- Latest features of JavaScript i.e. ES6, ES7, ES8 is used
- [React JS Hooks](https://reactjs.org/docs/hooks-intro.html) are used with Functional components
- ES8 `async/await` is used

<br/>

<ul>
 <li> This is Simple Chat Application </li>
 <li> It is a Full Stack Application </li>
</ul>

- All the user details, rooms and conversations are stored in the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). This is a *free/ shared* account on [Atlas](https://www.mongodb.com/cloud/atlas). **So Please use it wisely** 

<ul>
 <li>Login as well as Logout feature is added </li>
 <li>Error will be shown if the credentials are not correct</li>
</ul>

  - *for simplicity passwords are not encrypted*

<ul>
 <li> Real time communication is supported using <a href="https://www.npmjs.com/package/socket.io">Socket.io</a>
 <li> Rooms with users are supported </li>
 <li> Conversation of a specific rooms will be shown on clicking the corresponding room</li>  
</ul>

  - *for mobile screen user can go to the rooms page by clicking the `<-` icon at the end of the screen*
  - Multiline message can be send by hitting `Ctrl + ENTER`
  - To send a message hit `ENTER` key

<ul>
 <li> Online / Offline status are shown by the <i>violet dot</i> </li>
 <li> Read / Unread status of conversation is supported
 <li> All the conversation are stored in the database i.e. <i>persistant</i>
 <li> All the timestamps are shown in <i>UTC</i> format to taken into cross browser differences
</ul>

## Installation

Clone the repository:
```
git clone https://github.com/anijitsahu/react-app-simple-chat-app.git
```
Navigate inside the directory:
```
cd react-app-simple-chat-app
```
Install all the necessary dependecies
```
npm install
``` 
Now run the server:
```
npm run server
```
### Login to chat
---

1. Open `2` web browser and type`http://localhost:3000` in the address bar to load the application in each of them
2. In one browser login with username `anijit` and password `anijit123`
3. In another one login with username `jeetm` and password `jeetm76` and enjoy chatting

**Test users**


Username | Password
---    | ---
 anijit  |  anijit123
jeetm | jeetm76 

 
*tested with <img src="screenshots/chrome.png" width="20px" title="Google Chrome">[Google Chrome 89](https://www.google.com/chrome/) and <img src="screenshots/firefox.png" width="25px" title="Firefox Developer edition">[Mozilla Firefox 86](https://www.mozilla.org/en-US/firefox/new/)*  

## Screenshots

Some screens of the application is given below for better understanding. 

Desktop as well as Mobile version of the screenshots are given side by side.

<p> Login Screen <br/> 
 <img src="screenshots/desktop 1.png" width="590px" title="Login screen"/>
 <img src="screenshots/mobile 1.png" width="190px" title="Login screen"/> 
</p>
 
 <p> Entering credentials <br/> 
 <img src="screenshots/desktop 2.png" width="590px" title="Entering credentials screen"/>
 <img src="screenshots/mobile 2.png" width="190px" title="Entering credentials screen"/> 
</p>

<p> After submitting credentials <br/> 
 <img src="screenshots/desktop 3.png" width="590px" title="After submitting credentials screen"/>
 <img src="screenshots/mobile 3.png" width="190px" title="After submitting credentials screen"/> 
</p>

<p> If credentials are not correct <br/> 
 <img src="screenshots/desktop 4.png" width="590px" title="If credentials are not correct screen"/>
 <img src="screenshots/mobile 4.png" width="190px" title="If credentials are not correct screen"/> 
</p>

<p> After a successful login  <br/> 
 <img src="screenshots/desktop 5.png" width="590px" title="After a successful login screen"/>
 <img src="screenshots/mobile 5.png" width="190px" title="After a successful login screen"/> 
</p>

<p> When a new user joins <br/> 
 <img src="screenshots/desktop 6.png" width="590px" title="When a new user joins screen"/>
 <img src="screenshots/mobile 6.png" width="190px" title="When a new user joins screen"/> 
</p>

<p> When a new user joins (2nd browser) <br/> 
 <img src="screenshots/desktop 7.png" width="590px" title="When a new user joins (2nd browser) screen"/>
 <img src="screenshots/mobile 7.png" width="190px" title="When a new user joins (2nd browser) screen"/> 
</p>

<p> Sender type some message <br/> 
 <img src="screenshots/desktop 9.png" width="590px" title="Sender type some message screen"/>
 <img src="screenshots/mobile 9.png" width="190px" title="Sender type some message screen"/> 
</p>

<p> Receiver's room is updated <br/> 
 <img src="screenshots/desktop 10.png" width="590px" title="Receiver's room is updated screen"/>
 <img src="screenshots/mobile 10.png" width="190px" title="Receiver's room is updated screen"/> 
</p>

<p> Logout functionality <br/> 
 <img src="screenshots/desktop 11.png" width="590px" title="Logout functionality screen"/>
 <img src="screenshots/mobile 11.png" width="250px" title="Logout functionality screen"/> 
</p>



