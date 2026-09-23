import pool from "../pool.js";


export async function getAllItem() {
    const {rows} = await pool.query(
        'SELECT * FROM items'
    )
    return rows
}

export async function getItemById(id) {
    const {rows} = await pool.query(
        'SELECT * FROM items WHERE id =$1',
        [id]
    )
    return rows[0]
}

