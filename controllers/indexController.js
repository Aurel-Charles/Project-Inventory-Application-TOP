import { getCategories } from "../db/queries/category.js"
import { getCategoryStats, getOutOfStockItems, getStats } from "../db/queries/items.js"


export async function getIndex(req , res , next) {
    try {
        const [stats, categories, categoryStats] = await Promise.all([
            getStats(),
            getCategories(),
            getCategoryStats()
        ])
        res.render("index", { stats, categories, categoryStats, title: "Dashboard" })
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