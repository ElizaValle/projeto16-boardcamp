import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { jogoSchema } from "../schemas/jogos.schemas.js"
import { getGames, postGames } from "../controllers/jogos.controllers.js"

const jogosRouter = Router()

jogosRouter.post("/games", validateSchema(jogoSchema) , postGames)
jogosRouter.get("/games", getGames)

export default jogosRouter