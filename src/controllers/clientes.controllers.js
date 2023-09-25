import db from "../database/database.connection.js"

export async function postCustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body

    try {
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, 
            [name, phone, cpf, birthday])

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers;`)

        res.send(customers.rows)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomersById(req, res) {
    try {
        res.send(customer)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function putCustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body
    const { id } = req.params

    try {
        await db.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`,
            [name, phone,cpf, birthday])

        res.send(200)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

