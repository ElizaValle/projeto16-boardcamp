import { Router } from "express"
import jogosRouter from "./jogos.routes.js"
import clientesRouter from "./clientes.routes.js"
import alugueisRouter from "./alugueis.routes.js"

const router = Router()

router.use(jogosRouter)
router.use(clientesRouter)
router.use(alugueisRouter)

export default router