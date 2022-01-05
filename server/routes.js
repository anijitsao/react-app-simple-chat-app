// dependencies
import { Router } from "express"
const router = Router()

// local file dependencies
import { connectDbAndRunQueries } from "./dbOps.js"

// most important to serve static pages don't forget
// router.use(express.static('../dist'))

router.post("/login", (req, res) => {
	connectDbAndRunQueries("login", req, res)
})

router.post("/getrooms/:id", (req, res) => {
	connectDbAndRunQueries("getRooms", req, res)
})

router.get("/getconversation/:id", (req, res) => {
	connectDbAndRunQueries("getConversation", req, res)
})

router.put("/updateroom", (req, res) => {
	connectDbAndRunQueries("updateRoom", req, res)
})

router.put("/updateroomreadstatus", (req, res) => {
	connectDbAndRunQueries("updateRoomReadStatus", req, res)
})

export default router
