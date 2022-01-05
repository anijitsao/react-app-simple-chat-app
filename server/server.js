// imports dependencies
import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"

import { createServer } from "http"
import { Server } from "socket.io"

import { fileURLToPath } from "url"
import path, { dirname } from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// local file dependencies
import router from "./routes.js"

const app = express()
const server = createServer(app)
const io = new Server(server)

// middlewares
app.use(cors())
app.use(express.json({ type: "application/json" }))
app.use(morgan("dev"))
app.use(helmet({ contentSecurityPolicy: false }))

// serve the static pages
app.use(express.static(path.join(__dirname, "../public/dist")))

// different routes
app.use("/services", router)

// socket related events
import { allSocketOps } from "./socketOps.js"
allSocketOps(io)

// listen
server.listen(process.env.PORT, () => {
	console.log("Server is running on ", process.env.PORT)
})
