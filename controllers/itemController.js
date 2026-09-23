import { getCategoryById } from "../db/queries/category.js";
import { getAllItem, getItemById } from "../db/queries/items.js";
import { getTorrefactorById } from "../db/queries/torrefactors.js";


export async function getItemsFromDb(req, res, next) {
    try {
        const items = await getAllItem()
        console.log(items);
        res.render("items/index", {items})
    } catch (error) {
        next()
    }
}

export async function getItemByIdFromDb(req, res, next) {
    try {
        const id = req.params.id
        const item = await getItemById(id)
        const category = await getCategoryById(item.category_id)
        const torrefactor = await getTorrefactorById(item.torrefactor_id)
        console.log(torrefactor);
        
        res.render("items/show" , {item , category, torrefactor})
    } catch (error) {
        next(error)
    }
}