// dependenciees
import axios from "axios"

const connectBackend = async (config) => {
    return await axios(config)
}

export { connectBackend }
