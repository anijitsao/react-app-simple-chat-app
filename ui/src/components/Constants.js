// list of all the constants
const Constants = () => {
  const url = "http://localhost:3000/services"
  return {
    // all the URLs
    url,
    login: `${url}/login`,

    getConversation: `${url}/getconversation/{id}`,
    getRooms: `${url}/getrooms/{id}`,
    saveReadStatus: `${url}/updateroomreadstatus`,

    // the Content-Type
    header: { "Content-Type": "application/json" },

    // HTTP verbs
    method: {
      POST: "POST",
      GET: "GET",
      PUT: "PUT",
    },

    // initialize
    // theWeek: makeFormattedWeek(),

    formatDates: (dateReceived) => {
      const theWeek = makeFormattedWeek()
      if (theWeek[dateReceived.substring(0, dateReceived.indexOf("T"))]) {
        let formattedDate =
          theWeek[dateReceived.substring(0, dateReceived.indexOf("T"))]
        return formattedDate == "Today"
          ? dateReceived.substr(dateReceived.indexOf("T") + 1, 5)
          : formattedDate
      } else {
        return `${new Date(dateReceived).getDate()}/${
          new Date(dateReceived).getMonth() + 1
        }/${new Date(dateReceived).getFullYear()}`
      }
    },
  }
}

function makeFormattedWeek() {
  const theWeek = {}

  // list of day names
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  for (let i = 0; i < 7; i++) {
    // reset today
    let today = new Date()

    // get the previous dates one at a time
    let prevDate = today.setDate(today.getDate() - i)

    // format previous date as per the need
    let prevDateStr = new Date(prevDate).toISOString()
    prevDateStr = prevDateStr.substring(0, prevDateStr.indexOf("T"))

    // fill the object accordingly
    theWeek[prevDateStr] = i == 0 ? "Today" : days[new Date(prevDate).getDay()]
  }
  return theWeek
}

export default Constants
