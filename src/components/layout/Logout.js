import React from 'react';

const Logout = () => {
  return (
    <div className="logout">
	      <a href="#" className="logout-link" onClick={()=> {location.reload()}}>Logout</a>
    </div>
  );
};


export default Logout;