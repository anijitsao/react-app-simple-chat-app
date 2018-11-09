// dependencies
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID

const URI_TO_CONNECT_MONGODB = "mongodb+srv://root:root123@anijitsmongo-mwm6l.mongodb.net/allapps";
const DB_NAME = "allapps"
const COLLECTION_USERS = "users"
const COLLECTION_ROOMS = "rooms"

// this function will connect db and based on API send response
let connectDbAndRunQueries = async (apiName, req, res) => {
	try {
		let client = await MongoClient.connect(URI_TO_CONNECT_MONGODB, { useNewUrlParser: true })
		// perform actions on the db object
		// const db = client.db(DB_NAME).db("users")

		const db = client.db(DB_NAME)

		// perform several db actions based on API names
		chooseApiAndSendResponse(apiName, db, req, res, client)
	} catch (err) {
		console.log('Some Error occurred ...', err)
	}
}

// choose the particular function for an API and process it
let chooseApiAndSendResponse = (apiName, db, req, res, client) => {
	switch (apiName) {
		case 'welcome':
			makeWelcome(db, req, res, client)
			break;
		case 'login':
			makeLogin(db, req, res, client)
			break;
		case 'getRooms':
			makeGetRooms(db, req, res, client)
			break;
	}
}

// handle request for welcome API
let makeWelcome = async (db, req, res, client) => {

	let output = { "message": "Welcome" }
	try {
		let data = await db
			.collection(COLLECTION_USERS)
			.countDocuments()

		console.log('Hurrah !!! we have used async/ await', data)
		output['totalRecords'] = data
		sendOutputAndCloseConnection(client, output, res)

	} catch (err) {
		console.log("ERror occurred .. ", err)
		sendOutputAndCloseConnection(client)
	}
}

// handle request for /login API
let makeLogin = async (db, req, res, client) => {
	try {
		let { username, password } = req.body

		// default output when Login fails
		let output = { message: 'Failed to find the user' }

		let docs = await db
			.collection(COLLECTION_USERS)
			.find({ username, password }, { projection: { "password": 0 } })
			.toArray()

		// rename necessary fields
		docs.map((doc) => {
			doc.userId = doc._id
			doc.name = doc.fullName.substring(0, doc.fullName.indexOf(' '))
			delete doc._id
			delete doc.fullName
		})

		// if the user exists
		output = (docs.length > 0) ? { ...docs[0] } : output
		sendOutputAndCloseConnection(client, output, res)
	} catch (err) {
		sendOutputAndCloseConnection(client)
	}
}


// /getrooms API
let makeGetRooms = async (db, req, res, client) => {

	let output = { "message": "success" }
	let { rooms } = req.body


	roomIds = rooms.map((ele) => {
		return ObjectId(ele.roomId)
	})

	let messages = await db
		.collection(COLLECTION_ROOMS)
		.find({ _id: { $in: roomIds } }, { projection: { "lastMessage": 1 } })
		.toArray()

	// if we get the data from the back end
	// console.log('Messages are', JSON.stringify(messages, null, '\t'))
	if (messages.length > 0) {
		output = []

		messages.forEach((ele, index) => {
			output.push({
				"roomname": rooms[index].roomName,
				"roomId": ele._id,
				"lastMessage": (ele.lastMessage) ? ele.lastMessage.msgBody : [],
				"dateInfo": (ele.lastMessage) ? ele.lastMessage.timeSent : 'NA',
				"senderId": (ele.lastMessage) ? ele.lastMessage.senderId : 'NA'
			})
		});

	}
	console.log('output before sending\n', output)


	sendOutputAndCloseConnection(client, output, res)

}



function sendOutputAndCloseConnection(client, output, res) {
	if (output && res) {
		res.json(output)
	}

	// close the database connection after sending the response
	client.close()
}

// exports
module.exports = {
	connectDbAndRunQueries
}