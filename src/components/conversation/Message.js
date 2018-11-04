import React from 'react';

const Message = ({ msgBody, timeSent, senderId }) => {
  return (
    <div className={(senderId == 'anijit123') ? "msg my-msg": "msg friend-msg"}>{msgBody}
      <span className="time-sent">{timeSent}</span>
    </div>
  );
};



export default Message;