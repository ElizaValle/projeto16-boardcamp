import { Router } from "express"
import jogosRouter from "./jogos.routes.js"
import clientesRouter from "./clientes.routes.js"

const router = Router()

router.use(jogosRouter)
router.use(clientesRouter)

export default router