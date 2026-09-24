import { getCategories, getCategoryById } from "../db/queries/category.js";
import { addNewItem, deleteItemById, getAllItem, getItemById, updateItem } from "../db/queries/items.js";
import { getTorrefactorById, getTorrefactors } from "../db/queries/torrefactors.js";
import { HttpError } from "../error/httpError.js";


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
        if (!item) throw new HttpError("Item not found", 404)
        const category = await getCategoryById(item.category_id)
        if (!category) throw new HttpError("Category not found", 404)
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

export async function postDeleteItemById(req, res, next) {
    try {
        const id = req.params.id;
        const deletedItem = await deleteItemById(id)
        if (!deletedItem) throw new HttpError("Item not found", 404)
        console.log(deletedItem.name + " item has been deleted");
        res.redirect("/items")
    } catch (error) {
        next(error)
    }
}

export async function getEditItem(req, res, next) {
    try {
        const  id = req.params.id
        const item = await getItemById(id)
        if (!item) throw new HttpError("Item not found", 404)
        const categories = await getCategories()
        const torrefactors = await getTorrefactors()
        res.render("items/edit", {item, categories, torrefactors})
    } catch (error) {
        next(error)
    }
}

export async function postUpdateItem(req, res, next) {
    try {
        const id = req.params.id
        const {name, description, price, quantity, category_id, torrefactor_id} = req.body
        console.log(req.body);
        const updatedItem = await updateItem(id, name, description, price, quantity, category_id, torrefactor_id === "" ? null : torrefactor_id)
        console.log(updatedItem);
        
        res.redirect("/items")
    } catch (error) {
        next(error)
    }
}