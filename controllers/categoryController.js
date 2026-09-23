import { addNewCategory, getCategories, getCategoryById, getItemsByCategory } from "../db/queries/category.js";


export async function getCategoriesFromDb(req, res, next) {   
    try {
        const categories = await getCategories()
        console.log(categories);
        res.render("categories/index", {categories: categories})
    } catch (error) {
        next(error)
    }
}

export async function getCategoryFromDb(req, res, next) {
    try {
        const id = req.params.id
        console.log(id);
        
        const [category , items] = await Promise.all([
            getCategoryById(id),
            getItemsByCategory(id)
        ])
        console.log(category, items);
        res.render("categories/show", {category, items})
    } catch (error) {
        next(error)
    }
}


export function getAddCategoryForm(req, res, next){
    try {
        res.render("categories/new")
    } catch (error) {
        next(error)
    }
}

export async function postAddCategoryToDb(req, res, next) {
    try {
        const {name, description} = req.body 
        await addNewCategory(name, description)
        res.redirect("/categories")
    } catch (error) {
        next(error)
    }
}