import pool from "../pool.js";


export async function getAllItem() {
    const {rows} = await pool.query(
        'SELECT items.*, category.name AS category_name, torrefactors.name AS torrefactor_name FROM items JOIN category ON items.category_id = category.id LEFT JOIN torrefactors ON items.torrefactor_id = torrefactors.id'
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

export async function addNewItem(name, description, price, quantity, category_id, torrefactor_id) {
    pool.query(
        'INSERT INTO items (name, description, price, quantity, category_id, torrefactor_id) VAlUES ($1, $2, $3, $4, $5, $6)',
        [
            name,
            description,
            price,
            quantity,
            category_id,
            torrefactor_id
        ]
    )
}

export async function deleteItemById(id) {
    const {rows} = await pool.query(
        'DELETE FROM items WHERE id = $1 RETURNING *',
        [id]
    )
    return rows
}