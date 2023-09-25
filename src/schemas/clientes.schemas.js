import joi from "joi"

export const clienteSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().max(11).required(),
    cpf: joi.string().length(11).required(),
    birthday: joi.date().required()
})