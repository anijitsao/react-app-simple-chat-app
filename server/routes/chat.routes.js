// dependencies
import { Router } from "express";
const router = Router();

// local file dependencies
import { connectDbAndRunQueries } from "../services/chat.service.js";

// most important to serve static pages don't forget
// router.use(express.static('../dist'))

router.post("/login", (req, res) => {
  connectDbAndRunQueries("login", req, res);
});

router.post("/get-rooms/:id", (req, res) => {
  connectDbAndRunQueries("getRooms", req, res);
});

router.get("/get-conversation/:id", (req, res) => {
  connectDbAndRunQueries("getConversation", req, res);
});

router.put("/update-room", (req, res) => {
  connectDbAndRunQueries("updateRoom", req, res);
});

router.put("/update-room-read-status", (req, res) => {
  connectDbAndRunQueries("updateRoomReadStatus", req, res);
});

export default router;
