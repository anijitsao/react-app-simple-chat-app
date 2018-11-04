import React from 'react';

const UserGreeting = ({ username }) => {
  return (
    <div className="user-info">
      <img src="images/user_123.jpg" alt="logo of logged in user" className="user-icon" />
      <span className="user-greeting">Hi {username}</span>
    </div>
  );
};

export default UserGreeting;