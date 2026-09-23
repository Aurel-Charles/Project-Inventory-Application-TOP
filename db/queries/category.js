import pool from "../pool.js";

export async function getCategories() {
    const {rows} = await pool.query('SELECT * FROM category')
    return rows
}

export async function getCategoryById(id) {
    const {rows} = await pool.query(
        'SELECT * FROM category WHERE id = $1',
        [id]
    )
    return rows[0]
}

export async function getItemsByCategory(id) {
    const {rows} = await pool.query(
        'SELECT * FROM items WHERE category_id = $1',
        [id]
    )
    return rows
}