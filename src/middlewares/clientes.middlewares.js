import db from "../database/database.connection.js"

export async function validatePostCustomer(req, res, next) {
    const { cpf } = req.body

    try {
        const existingCustomer = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf])
        if (existingCustomer) res.status(409).send("CPF já existe!")

        next()

    } catch (err) {
        res.sendStatus(500).send(err.message)
    }
}

export async function validateGetCustomer(req, res, next) {
    const { id } = req.params

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [id])
        if (!customer) return res.status(404).send("Cliente não existe!")

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }
}
