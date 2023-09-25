import { Router } from "express"
import { deleteRental, getRentals, postFinishRental, postRentals } from "../controllers/alugueis.controllers.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { aluguelSchema } from "../schemas/alugueis.schemas.js"
import { validateDeleteRentals, validateFinishRentals, validatePostRentals } from "../middlewares/alugueis.middlewares.js"

const alugueisRouter = Router()

alugueisRouter.post("/rentals", validateSchema(aluguelSchema), validatePostRentals, postRentals)
alugueisRouter.get("/rentals", getRentals)
alugueisRouter.post("/rentals/:id/return", validateFinishRentals, postFinishRental)
alugueisRouter.delete("/rentals/:id", validateDeleteRentals, deleteRental)

export default alugueisRouter