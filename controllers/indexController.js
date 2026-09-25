import { getOutOfStockItems, getStats } from "../db/queries/items.js"


export async function getIndex(req , res , next) {
    try {
        const stats = await getStats()
        console.log(stats);
        
        res.render("index" , { stats,  title : "Coffee Inventory"})
    } catch (error) {
        next(error)
    }
}

export async function getOutOfStockItemsFromDb(req, res ,next) {
    try {
        const out_of_stock = await getOutOfStockItems()
        res.render("items/out-of-stock" , {items : out_of_stock})
    } catch (error) {
        next(error)
    }
}