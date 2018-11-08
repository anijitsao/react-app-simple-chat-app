// dependencies
const MongoClient = require('mongodb').MongoClient;

const URI_TO_CONNECT_MONGODB = "mongodb+srv://root:root123@anijitsmongo-mwm6l.mongodb.net/allapps";
const DB_NAME = "allapps"

// this function will connect db and based on API send response
let connectDbAndRunQueries = async (apiName, req, res) => {
	try {
		let client = await MongoClient.connect(URI_TO_CONNECT_MONGODB, { useNewUrlParser: true })
		// perform actions on the collection object
		const collection = client.db(DB_NAME).collection("musics")

		// perform several db actions based on API names
		chooseApiAndSendResponse(apiName, collection, req, res, client)
	} catch (err) {
		console.log('Some Error occurred ...', err)
	}
}

// choose the particular function for an API and process it
let chooseApiAndSendResponse = (apiName, collection, req, res, client) => {
	switch (apiName) {
		case 'getSongs':
			makeGetSongs(collection, req, res, client)
			break;
		case 'login':
			makeLogin(collection, req, res, client)
			break;
		case 'getRooms':
			makeGetRooms(collection, req, res, client)
			break;
	}
}

// handle request for welcome API
let makeGetSongs = async (collection, req, res, client) => {

	let output = { "message": "Welcome" }
	try {
		let data = await collection.find({}).toArray()
		console.log('Hurrah !!! we have used async/ await', data)
		output = [...data]
		sendOutputAndCloseConnection(client, output, res)

	} catch (err) {
		console.log("ERror occurred .. ", err)
		sendOutputAndCloseConnection(client)
	}
}

// handle request for /login API
let makeLogin = async (collection, req, res, client) => {
	try {
		let { username, password } = req.body

		// default output when Login fails
		let output = { message: 'Failed to find the user' }

		let docs = await collection.find({ username, password }, { projection: { "password": 0 } }).toArray()

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
let makeGetRooms = async (collection, req, res, client) => {

	console.log('params are', req.params)
	let output = { "message": "success" }
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