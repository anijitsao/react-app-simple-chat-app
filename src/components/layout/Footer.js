import React from 'react';

const Footer = (props) => {
  let { toggleBackButton, showBackButton } = props
  return (
    <div className="footer">
      {
        (showBackButton == true) ?
          <i className="fa fa-arrow-left left-arrow" onClick={toggleBackButton}></i>
          :
          null
      }
    </div>
  );
};



export default Footer;