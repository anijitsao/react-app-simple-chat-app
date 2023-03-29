# react-app-simple-chat-app

A Simple Chat Application using [React JS](https://react.dev/learn), a JavaScript library to make awesome UI by Facebook, [Node JS](https://nodejs.org/en/docs), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/).

This application uses **component oriented UI** creation paradigm. All components are written in [JSX](https://react.dev/learn/writing-markup-with-jsx) and ES6 style and are combined to get a single build for production purpose using [Webpack 5](https://webpack.js.org/concepts/).

[Babel](https://babeljs.io/docs/) is used to _transpile_ all [JSX](https://react.dev/learn/writing-markup-with-jsx) code to vanilla JavaScript. For UI creation [HTML5](https://www.w3schools.com/html/html5_intro.asp) and [CSS3](https://www.w3schools.com/css/) are used.

This is a _responsive web application_ for viewing in both Mobile and Desktop.

Back end is implemented using [Node JS](https://nodejs.org/en/docs), [Express JS](https://expressjs.com/en/api.html) and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Real time communication is done using [Socket.io](https://www.npmjs.com/package/socket.io)



## Features

- Code is rewritten with latest version of [React JS](https://react.dev/learn) and [Node JS](https://nodejs.org/en/docs/).
- Latest features of JavaScript i.e. **ESNext** is used.

<br/>

<ul>
 <li> This is Full Stack Simple Chat Application. </li>

</ul>

- All the user details, rooms and conversations are stored in the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). This example uses a _free/ shared_ account. **So Please use it wisely**.

<ul>
 <li>Login as well as Logout feature is added. </li>
 <li>Error will be shown if the credentials are not correct.</li>
</ul>

- _for simplicity passwords are not encrypted_

<ul>
 <li> Real time communication is supported using <a href="https://www.npmjs.com/package/socket.io">Socket.io</a>.</li>
 <li> Rooms with users are supported. Conversation of a specific rooms will be shown on clicking the corresponding room.</li>  
</ul>

- _for mobile screen user can go to the rooms page by clicking the `<-` icon at the end of the screen_.
- Multiline message can be send by hitting `Ctrl + ENTER`.
- To send a message hit `ENTER` key.

<ul>
 <li> Online / Offline status are shown by the <i>violet dot</i>. </li>
 <li> Read / Unread status of conversation is supported.
 <li> All the conversation are stored in the database i.e. <i>persistant</i>.
 <li> All the timestamps are shown in <i>UTC</i> format to taken into cross browser differences.
</ul>

## Installation

Clone the repository:

```
git clone https://github.com/anijitsao/react-app-simple-chat-app.git
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

1. Open `2` web browser and type`http://localhost:3000` in the address bar to load the application in each of them.
2. In one browser login with one **Test users** credentials.
3. In another one login with _another_ **Test users** credentials and enjoy chatting.

**Test users**

| Username | Password  |
| -------- | --------- |
| anijit   | anijit123 |
| jeetm    | jeetm76   |

_tested with latest version of <img src="screenshots/chrome.png" width="20px" title="Google Chrome">[Google Chrome](https://www.google.com/chrome/) and <img src="screenshots/firefox.png" width="25px" title="Firefox Developer edition">[Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/)_

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
