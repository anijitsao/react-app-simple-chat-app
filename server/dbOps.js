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
		// select the db, Collections are selected based on needs
		const db = client.db(DB_NAME)

		// default output
		const output = { "message": "FAILED" }

		// perform several db actions based on API names
		chooseApiAndSendResponse(apiName, db, req, res, client, output)
	} catch (err) {
		console.log('Some Error occurred ...', err)
	}
}

// choose the particular function for an API and process it
let chooseApiAndSendResponse = (apiName, db, req, res, client, output) => {

	// perform db specific ops based on API names
	switch (apiName) {
		case 'login':
			makeLogin(db, req, res, client, output)
			break;
		case 'getRooms':
			makeGetRooms(db, req, res, client, output)
			break;
		case 'getConversation':
			makeGetConversation(db, req, res, client, output)
			break;
	}
}

// handle request for /login API
let makeLogin = async (db, req, res, client, output) => {
	try {
		let { username, password } = req.body

		// default output when Login fails
		// let output = { message: 'Failed to find the user' }

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
let makeGetRooms = async (db, req, res, client, output) => {

	let { rooms } = req.body
	roomIds = rooms.map((ele) => {
		return ObjectId(ele.roomId)
	})

	try {
		// db call
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
		sendOutputAndCloseConnection(client, output, res)
	} catch (err) {
		console.log('unable to get last message for a room', err)
		sendOutputAndCloseConnection(client, output, res)
	}
}

// /getconversation API
let makeGetConversation = async (db, req, res, client, output) => {
	let { id } = req.params

	try {
		// db call
		let data = await db
			.collection(COLLECTION_ROOMS)
			.find({ _id: ObjectId(id) }, { projection: { "messages": 1 } })
			.toArray()

		// copy the messages to the resulting output
		output = [...data[0].messages]

		// add the id field to each message
		output = output.map((ele, index) => {
			ele = { ...ele, ...{ "id": `${id}${index}` } }
			return ele
		})

		sendOutputAndCloseConnection(client, output, res)
	} catch (error) {
		console.log('Unable to get conversation for that room', error)
		sendOutputAndCloseConnection(client, output, res)
	}
}


function sendOutputAndCloseConnection(client, output, res) {
	if (output && res) {
		console.log('output before sending\n', output)
		res.json(output)
	}

	// close the database connection after sending the response
	client.close()
}

// exports
module.exports = {
	connectDbAndRunQueries
}