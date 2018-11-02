import React from 'react';

// components 
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';


// css
import './css/style.css'

const App = () => {
  return (
    <div className="container">
    	{ /* including the Title and other components */ }
  		<Header />
  		<Content />
  		<Footer />
  	</div>
  );
};



export default App;