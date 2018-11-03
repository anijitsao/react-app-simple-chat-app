import React from 'react';

// components
import Title from './Title'
import UserGreeting from './UserGreeting'


const Header = ({ userInfo }) => {
  return (
    <div className="header">
      <Title />
      { (userInfo)? <UserGreeting username={userInfo.name}/>: '' }
    </div>
  );
};




export default Header;