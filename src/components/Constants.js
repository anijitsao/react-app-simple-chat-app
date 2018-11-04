// import React, { Component } from 'react';

class Constants {

  constructor() {

    // list of all the constants

    // all the URLs
    this.url = 'http://localhost:3000'
    this.login= `${this.url}/login`
    
    this.conversation = `${this.url}/conversation/{id}`
    this.friends = `${this.url}/friends/{id}`

    // the Content-Type
    this.header = { 'Content-Type': 'application/json' }

    // HTTP verbs
    this.method = {
      "POST": "POST",
      "GET": "GET"
    }

  }

}

export default Constants;