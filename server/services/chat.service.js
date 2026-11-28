// dependencies
import { sendResponse } from "../utils/response.util.js";

import { MongoClient, ObjectId } from "../lib/mongo.client.js";
import { closeConnection, connectDB, selectDB } from "../utils/db.utils.js";

const {
  URI_TO_CONNECT_MONGODB,
  DB_NAME,
  COLLECTION_ROOMS,
  COLLECTION_USERS,
  SUCCESS,
  SERVER_ERR,
} = process.env;

// handle request for /login API
const getUserDetails = async (req, res) => {
  let connection;
  let output;
  try {
    connection = connectDB(MongoClient, URI_TO_CONNECT_MONGODB);
    let db = await selectDB(connection, DB_NAME);
    const { username, password } = req.body;

    const docs = await db
      .collection(COLLECTION_USERS)
      .find({ username, password }, { projection: { password: 0 } })
      .toArray();

    // rename necessary fields
    docs.map((doc) => {
      doc.userId = doc._id;
      doc.name = doc.fullName.substring(0, doc.fullName.indexOf(" "));
      delete doc._id;
      delete doc.fullName;
    });

    // if the user exists or sends FAILED message
    output = docs.length > 0 ? { ...docs[0] } : { message: "FAILED" };
    sendResponse(res, SUCCESS, output);
  } catch (err) {
    output = { error: { message: err.message } };
    console.log("Error occurred", err);
    sendResponse(res, SERVER_ERR, output);
  } finally {
    await closeConnection(connection);
  }
};

// /getrooms API
const getRooms = async (req, res) => {
  let connection;
  let output;

  try {
    connection = connectDB(MongoClient, URI_TO_CONNECT_MONGODB);
    let db = selectDB(connection, DB_NAME);

    const { rooms } = req.body;
    const roomIds = rooms.map((ele) => {
      return ObjectId(ele.roomId);
    });

    // db call
    const messages = await db
      .collection(COLLECTION_ROOMS)
      .find({ _id: { $in: roomIds } }, { projection: { lastMessage: 1 } })
      .toArray();

    // if we get the data from the back end
    // console.log('Messages are', JSON.stringify(messages, null, '\t'))
    if (messages.length > 0) {
      output = [];

      messages.forEach((ele, index) => {
        output.push({
          roomName: rooms[index].roomName,
          roomId: ele._id,
          lastMessage: ele.lastMessage ? ele.lastMessage.msgBody : [],
          dateInfo: ele.lastMessage ? ele.lastMessage.timeSent : "NA",
          senderId: ele.lastMessage ? ele.lastMessage.senderId : "NA",
          partnerId: rooms[index].partnerId || "NA",
          read: rooms[index].read,
        });
      });
    }
  } catch (err) {
    console.log("unable to get last message for a room", err);
  } finally {
    sendResponseAndCloseConnection(client, output, res, apiName);
  }
};

// /getconversation API
const getConversation = async (db, req, res, client, output, apiName) => {
  const { id } = req.params;

  try {
    // db call
    const data = await db
      .collection(COLLECTION_ROOMS)
      .find({ _id: ObjectId(id) }, { projection: { messages: 1 } })
      .toArray();

    // copy the messages to the resulting output
    output = [...data[0].messages];

    // add the id field to each message
    output = output.map((ele, index) => {
      ele = { ...ele, ...{ id: `${id}${index}` } };
      return ele;
    });
  } catch (error) {
    console.log("Unable to get conversation for that room", error);
  } finally {
    sendResponseAndCloseConnection(client, output, res, apiName);
  }
};

const updateRoom = async (db, req, res, client, output, apiName) => {
  console.log("params received", req.params);
  console.log("body of the req", req.body);
  const allMessages = sortMessagesFromSocket(req.body);

  const { roomId } = req.body;
  // const message = { ...req.body }
  // console.log('This is for Room', roomId)

  // How TO USE PUSH WITHIN UPDATE DEMO QUERY
  // const data = await db
  // 	.collection(COLLECTION_ROOMS)
  // 	.updateOne({ _id: ObjectId(roomId) }, { $set: { "lastMessage": message }, $push: { "messages": message } })

  try {
    // initialize the bulk
    const bulk = await db
      .collection(COLLECTION_ROOMS)
      .initializeOrderedBulkOp();

    const ops = [];

    // put them all in ops Promises
    for (let i = 0; i < allMessages.length; i++) {
      ops.push(
        await bulk.find({ _id: ObjectId(allMessages[i].roomId) }).updateOne({
          $set: { lastMessage: allMessages[i] },
          $push: { messages: allMessages[i] },
        }),
      );
    }

    // execute all of them in bulk
    const result = await bulk.execute();
    console.log("Modified docs: ", result.nModified);
  } catch (error) {
    console.log("Unable to update rooms with messages", error);
  } finally {
    res && sendResponseAndCloseConnection(client, output, res, apiName);
  }
};

const updateRoomReadStatus = async (req, res) => {
  console.log("body of the req", req.body);

  const { userId, roomName, read } = req.body;
  try {
    const docs = await db
      .collection(COLLECTION_USERS)
      .updateOne(
        { _id: ObjectId(userId), "rooms.roomName": roomName },
        { $set: { "rooms.$.read": read } },
      );

    output = { ...output, nModified: docs.result.nModified };
    sendResponse(res, SUCCESS, output);
  } catch (error) {
    console.log("Unable to change the read status", error);
    sendResponse(res, SERVER_ERR, { error: { message: error.message } });
  } finally {
    closeConnection(connection);
  }
};

const sortMessagesFromSocket = (body) => {
  let allMessages = [];

  // push the message comes from the socket
  if (body) {
    allMessages = [...body];
  }

  allMessages = allMessages.sort((a, b) => {
    return new Date(a.timeSent) - new Date(b.timeSent);
  });
  console.log("All messages to be inserted in the DB", allMessages);
  return allMessages;
};
// exports
export {
  getConversation,
  getRooms,
  getUserDetails,
  updateRoom,
  updateRoomReadStatus,
};
