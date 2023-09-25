import db from "../database/database.connection.js"

export async function validatePostGames(req, res, next) {
    const { name } = req.body

    try {
        const existName = await db.query(`SELECT * FROM games WHERE name = $1;`, [name])
        if (existName) return res.status(409).send("O nome do jogo já existe!")

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }
}