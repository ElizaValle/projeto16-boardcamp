import joi from "joi"

export const jogoSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri(),
    stockTotal: joi.number().min(1).required(),
    pricePerDay: joi.number().min(1).required()
})