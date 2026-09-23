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

export async function addNewCategory(name, description) {
    await pool.query(
        'INSERT INTO category (name, description) VALUES ($1, $2)',
        [name, description]
    )
}

export async function deleteCategoryById(id) {
    const {rows} = await pool.query(
        'DELETE FROM category WHERE id = $1 RETURNING *',
        [id]
    )
    return rows[0]
}

export async function updateCategory(id, name, description) {
    const {rows} = await pool.query(
        'UPDATE category SET name = $2, description = $3 WHERE id = $1',
        [id , name, description]
    )
    return rows
}