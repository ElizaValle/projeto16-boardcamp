import { Router } from "express"
import { getCustomers, getCustomersById, postCustomers, putCustomers } from "../controllers/clientes.controllers.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { clienteSchema } from "../schemas/clientes.schemas.js"
import { validateGetCustomer, validatePostCustomer } from "../middlewares/clientes.middlewares.js"

const clientesRouter = Router()

clientesRouter.post("/customers", validateSchema(clienteSchema), validatePostCustomer, postCustomers)
clientesRouter.get("/customers", getCustomers)
clientesRouter.get("/customers/:id", validateGetCustomer, getCustomersById)
clientesRouter.put("/customers/:id", validateSchema(clienteSchema), validatePostCustomer, putCustomers)

export default clientesRouter