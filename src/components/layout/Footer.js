import React from 'react';

const Footer = (props) => {
  let { toggleMessagePanel } = props
  return (
    <div className="footer">
      <i className="fa fa-arrow-left left-arrow" onClick={toggleMessagePanel}></i>
    </div>
  );
};



export default Footer;