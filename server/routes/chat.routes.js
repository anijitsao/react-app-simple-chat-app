// dependencies
import { Router } from "express";
const router = Router();

// local file dependencies
import {
  getConversation,
  getRooms,
  getUserDetails,
  updateRoom,
  updateRoomReadStatus,
} from "../services/chat.service.js";

router.post("/login", (req, res) => {
  getUserDetails(req, res);
});

router.post("/get-rooms/:id", (req, res) => {
  getRooms(req, res);
});

router.get("/get-conversation/:id", (req, res) => {
  getConversation(req, res);
});

router.put("/update-room", (req, res) => {
  updateRoom(req, res);
});

router.put("/update-room-read-status", (req, res) => {
  updateRoomReadStatus(req, res);
});

export default router;
