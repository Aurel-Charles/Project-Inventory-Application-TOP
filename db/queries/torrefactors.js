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

export async function addNewTorrefactor(name, country, website) {
    await pool.query(
        'INSERT INTO torrefactors (name, country, website) VALUES ($1, $2, $3)',
        [name,country,website]
    )
}

export async function deleteTorrefactorById(id) {
    const {rows} = await pool.query(
        'DELETE FROM torrefactors WHERE id = $1 RETURNING *',
        [id]
    )
    return rows
}

export async function updateTorrefactor(id, name, country, website) {
    const {rows} = await pool.query(
        'UPDATE torrefactors SET name = $2, country = $3, website = $4 WHERE id = $1',
        [id , name, country, website]
    )
}