import express from "express"
import cors from "cors"
import router from "./routes/index.routes.js"

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))