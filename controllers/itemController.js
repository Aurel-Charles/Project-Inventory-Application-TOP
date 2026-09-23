import { getCategories, getCategoryById } from "../db/queries/category.js";
import { addNewItem, getAllItem, getItemById } from "../db/queries/items.js";
import { getTorrefactorById, getTorrefactors } from "../db/queries/torrefactors.js";


export async function getItemsFromDb(req, res, next) {
    try {
        const items = await getAllItem()
        console.log(items);
        res.render("items/index", {items })
    } catch (error) {
        next(error)
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



export async function getAddItemForm(req, res, next){
    try {
        const [categories, torrefactors] = await Promise.all([
            getCategories(),
            getTorrefactors()
        ])
        console.log(categories);
        console.log(torrefactors);
        
        res.render("items/new", {categories, torrefactors})
    } catch (error) {
        next(error)
    }
}

export async function postAddNewItem(req, res, next) {
    try {
        const {name, description, price, quantity, category_id, torrefactor_id } = req.body
        await addNewItem(name, description, price, quantity, category_id, torrefactor_id === "" ? null : torrefactor_id )
        res.redirect("/items")
    } catch (error) {
        next(error)
    }
}