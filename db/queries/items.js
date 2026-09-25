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
    await pool.query(
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
    return rows[0]
}

export async function updateItem(id, name, description, price , quantity, category_id, torrefactor_id) {
    const {rows} = await pool.query(
        'UPDATE items SET name = $2, description = $3, price = $4, quantity = $5, category_id = $6, torrefactor_id = $7 WHERE id = $1',
        [id , name, description, price, quantity , category_id, torrefactor_id]
    )
    return rows
}

export async function getStats() {
    const {rows} = await pool.query(`
        SELECT 
            COUNT(*) AS total_items,
            COUNT(*) FILTER (WHERE quantity = 0) AS out_of_stock,
            COUNT(*) FILTER (WHERE category.name = 'Coffee') AS total_coffee,
            COUNT(*) FILTER (WHERE category.name = 'Brewer') AS total_brewer,
            COUNT(*) FILTER (WHERE category.name = 'Accessory') AS total_accessory,
            (SELECT COUNT(*) FROM torrefactors) AS total_torrefactors,
            SUM(price * quantity) AS total_stock_value
        FROM items
        JOIN category ON items.category_id = category.id
    `)
    return rows[0]
}

export async function getOutOfStockItems() {
    const {rows} = await pool.query(`
        SELECT items.*, category.name AS category_name, 
               torrefactors.name AS torrefactor_name 
        FROM items 
        JOIN category ON items.category_id = category.id
        LEFT JOIN torrefactors ON items.torrefactor_id = torrefactors.id
        WHERE quantity = 0
    `)
    return rows
}