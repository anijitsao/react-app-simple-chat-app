import React from 'react';

const Message = ({ msgBody, timeSent }) => {
  return (
    <div className="msg friend-msg">{msgBody}
      <span className="time-sent">{timeSent}</span>
    </div>
  );
};



export default Message;