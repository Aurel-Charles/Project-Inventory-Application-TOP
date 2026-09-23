import pool from "../pool.js"


export async function getTorrefactors() {
    const {rows} = await pool.query(
        'SELECT * FROM torrefactors'
    )
    return rows
}

export async function getTorrefactorById(id) {
    const {rows} = await pool.query(
        'SELECT * FROM torrefactors WHERE id = $1',
        [id]
    )
    return rows[0]
}

export async function getItemsByTorrefactor(id) {
   const {rows} = await pool.query(
    'SELECT * FROM items WHERE torrefactor_id = $1',
    [id]
   )
   return rows
}