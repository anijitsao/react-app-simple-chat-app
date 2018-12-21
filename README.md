# react-app-simple-chat-app

A Simple Chat Application using [React JS](https://reactjs.org/docs/getting-started.html), a JavaScript library to make awesome UI by Facebook, [Node JS](https://nodejs.org/docs/latest-v8.x/api/), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/).

This application uses [React JS](https://reactjs.org/docs/getting-started.html) component oriented UI creation paradigm. All components are written in [JSX](https://reactjs.org/docs/jsx-in-depth.html) and ES6 style and are
combined to get a single build for production purpose using [Webpack 4](https://webpack.js.org/concepts/). 

ES6 `module` creation along with `import /export` is used. [Babel](https://babeljs.io/docs/en/babel-preset-react) is used to *transpile* all [JSX](https://reactjs.org/docs/jsx-in-depth.html) code to vanilla JavaScript code. To install all the dependecies `npm` is used.

For UI creation [HTML5](https://www.w3schools.com/html/html5_intro.asp) and [CSS3](https://www.w3schools.com/css/) are used. [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout), the new feature of [CSS3](https://www.w3schools.com/css/) is used for layout creation purpose.

Back end is implemented using [Node JS](https://nodejs.org/docs/latest-v8.x/api/), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/). [Atlas](https://www.mongodb.com/cloud/atlas), the *Cloud* version of [MongoDB](https://docs.mongodb.com/)
is used.

This is a *responsive web application* for viewing in both Mobile and Desktop.


## Features
<ul>
 <li> This is Simple Music Application </li>
 <li> It is a Full Stack Application </li>
</ul>

- All the song details are stored in the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). This is a *free/ shared* account on [Atlas](https://www.mongodb.com/cloud/atlas). **So Please use it wisely** 


<ul>
 <li> Application is loaded with the songs </li>
 <li> Listening of the songs is supported </li>
 <li> Searching from the list of songs is possible </li>
</ul>

- Information about the song (Movie, Album, Artist) is available on click of the `i` icon
- Changing the rating is supported
- All the ratings are saved in the database i.e. *persistant* 
- Listing of Top 5 songs *based on their rating* is available


## Installation

1. Clone the repository using `git clone https://github.com/anijitsahu/react-app-simple-music-app.git` from `Git Bash / Command Prompt`
2. Navigate inside the directory by `cd react-app-simple-music-app`
3. Install all the necessary dependecies by using `npm install` 
4. Navigate to the directory `cd server`
5. Run the server by `node server.js`
5. Open the web browser and type`http://localhost:3000` in the address bar to load the application 
 
*tested with <img src="screenshots/chrome.png" width="20px" title="Google Chrome">Google Chrome v70 and <img src="screenshots/firefox.png" width="25px" title="Firefox Developer edition">Mozilla Firefox Developer Editon*  

## Screenshots

Some screens of the application is given below for better understanding. 

Desktop as well as Mobile version of the screenshots are given side by side.

<p> Initial screen <br/> 
 <img src="screenshots/desktop 1.png" width="590px" title="initial screen"/>
 <img src="screenshots/mobile 1.png" width="190px" title="initial screen"/> 
</p>
 
 <p> After loading the songs <br/> 
 <img src="screenshots/desktop 2.png" width="590px" title="After loading the songs screen"/>
 <img src="screenshots/mobile 2.png" width="190px" title="After loading the songs screen"/> 
</p>

<p> Top 5 Songs <br/> 
 <img src="screenshots/desktop 3.png" width="590px" title="Top 5 Songs screen"/>
 <img src="screenshots/mobile 3.png" width="190px" title="Top 5 Songs screen"/> 
</p>

<p> Showing information of a song <br/> 
 <img src="screenshots/desktop 4.png" width="590px" title="Showing information of a song screen"/>
 <img src="screenshots/mobile 4.png" width="190px" title="Showing information of a song screen"/> 
</p>

<p> Searching and showing searched songs <br/> 
 <img src="screenshots/desktop 5.png" width="590px" title="Searching and showing searched songs screen"/>
 <img src="screenshots/mobile 5.png" width="190px" title="Searching and showing searched songs screen"/> 
</p>


