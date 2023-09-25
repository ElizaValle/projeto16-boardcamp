import joi from "joi"

export const aluguelSchema = joi.object({
    customerId: joi.number().integer().required(),
    gameId: joi.number().integer().required(), 
    daysRented: joi.number().integer().min(1).required()
})