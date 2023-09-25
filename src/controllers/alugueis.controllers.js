import { db } from "../database/database.connection"
import dayjs from "dayjs"

export async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body

    try {
        const game = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId])
        const rentDate = dayjs().format("YYYY-MM-DD")
        const originalPrice = daysRented * game.rows[0].pricePerDay

        await db.query(`
            INSERT INTO rentals (customerId, gameId, rentDate, daysRented, originalPrice, returnDate, delayFee)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [customerId, gameId, rentDate, daysRented, originalPrice, null, null]
        )

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(`SELECT * FROM rentals`)

        const formattedRentals = rentals.map((rental) => ({
            id: rental.id,
            customerId: rental.customerId,
            gameId: rental.gameId,
            rentDate: rental.rentDate,
            daysRented: rental.daysRented,
            returnDate: rental.returnDate,
            originalPrice: rental.originalPrice,
            delayFee: rental.delayFee,
            customer: {
                id: rental.customerId,
                name: rental.customers.name
            },
            game: {
                id: rental.gameId,
                name: rental.games.name
            }
        }))

        res.send(formattedRentals)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postFinishRental(req, res) {
    const { id } = req.params

    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
        
        const returnDate = dayjs().format("YYYY-MM-DD")
        
        const rentDate = dayjs(rental.rows[0].rentDate)
        const daysLate = dayjs(returnDate).diff(rentDate, "day")
        const game = await db.query(`SELECT * FROM games WHERE id=$1`, [rental.rows[0].gameId])
        const delayFee = daysLate > 0 ? daysLate * game.rows[0].pricePerDay : 0

        await db.query(`UPDATE rentals SET returnDate=$1, delayFee=$2 WHERE id=$3`,
            [returnDate, delayFee, id])

        res.sendStatus(200)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params

    try {
        await db.query(`DELETE FROM rentals WHERE id=$1`, [id])

        res.sendStatus(200)

    } catch (err) {
        res.status(500).send(err.message)
    }
}