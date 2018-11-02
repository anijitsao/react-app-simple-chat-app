import React from 'react';

// components
import Title from './Title'
import UserGreeting from './UserGreeting'


const Header = () => {
  let username = 'Anijit'
  return (
    <div className="header">
      <Title />
      <UserGreeting username={username}/>
    </div>
  );
};




export default Header;