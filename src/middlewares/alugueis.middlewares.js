import db from "../database/database.connection.js"

export async function validatePostRentals(req, res, next) {
    const { customerId, gameId } = req.body

    const customer = await db.query(`SELECT * FROM customers WHERE id=$1`, [customerId])
    if (customer.rowCount === 0) return res.status(400).send("Cliente não encontrado")

    const game = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId])
    if (game.rowCount === 0) return res.status(400).send("Jogo não encontrado")

    const rentedGames = await db.query(`SELECT COUNT(*) FROM rentals WHERE gameId=$1 AND returnDate IS NULL`, [gameId])
    if(rentedGames && rentedGames.rowCount >= game.stockTotal) return res.status(400).send("Jogo indisponível para aluguel")

    next()
}

export async function validateFinishRentals(req, res, next) {
    const { id } = req. params

    const rental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
    if (rental.rowCount === 0) return res.status(404).send("Aluguel não encontrado")
    if (rental.rows[0].returnDate) return res.status(400).send("Aluguel finalizado")

    next()
}

export async function validateDeleteRentals(req, res, next) {
    const { id } = req.params

    const rental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
    if (rental.rowCount === 0) return res.status(404).send("Aluguel não encontrado")
    if (rental.rows[0].returnDate) return res.status(400).send("Não foi possível apagar, aluguel já finalizado")

    next()
}