// import React, { Component } from 'react';

class Constants {

  constructor() {

    // list of all the constants

    // all the URLs
    this.url = 'http://localhost:3000/services'
    this.login = `${this.url}/login`

    this.getConversation = `${this.url}/getconversation/{id}`
    this.getRooms = `${this.url}/getrooms/{id}`
    this.saveReadStatus = `${this.url}/updateroomreadstatus`

    // the Content-Type
    this.header = { 'Content-Type': 'application/json' }

    // HTTP verbs
    this.method = {
      "POST": "POST",
      "GET": "GET",
      "PUT": "PUT"
    }


    // initialize
    this.theWeek = makeFormattedWeek()

    this.formatDates = (dateReceived) => {

      if (this.theWeek[dateReceived.substring(0, dateReceived.indexOf('T'))]) {
        let formattedDate = this.theWeek[dateReceived.substring(0, dateReceived.indexOf('T'))]
        return (formattedDate == 'Today') ? dateReceived.substr(dateReceived.indexOf('T') + 1, 5) : formattedDate
      } else {
        return `${new Date(dateReceived).getDate()}/${new Date(dateReceived).getMonth() + 1}/${new Date(dateReceived).getFullYear()}`
      }

    }
  }
}


function makeFormattedWeek() {
  let theWeek = {}
  
  // list of day names
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
  for (let i = 0; i < 7; i++) {
    // reset today
    let today = new Date()

    // get the previous dates one at a time
    let prevDate = today.setDate(today.getDate() - i)

    // format previous date as per the need
    let prevDateStr = new Date(prevDate).toISOString()
    prevDateStr = prevDateStr.substring(0, prevDateStr.indexOf('T'))

    // fill the object accordingly
    theWeek[prevDateStr] = (i == 0) ? 'Today' : days[new Date(prevDate).getDay()]
  }
  return theWeek
}


export default Constants;