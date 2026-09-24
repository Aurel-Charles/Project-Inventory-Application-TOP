import { addNewCategory, deleteCategoryById, getCategories, getCategoryById, getItemsByCategory, updateCategory } from "../db/queries/category.js";
import { HttpError } from "../error/httpError.js";


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
            const category = await getCategoryById(id)
            if (!category) throw new HttpError("Category not found", 404)
            
            const items = await getItemsByCategory(id)
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

    export async function postDeleteCategoryById(req, res, next) {
        try {
            const id = req.params.id
            const categoryDeleted = await deleteCategoryById(id)
            if (!categoryDeleted) throw new HttpError("Category not found", 404)
            console.log(categoryDeleted.name + " category has been deleted");
            res.redirect("/categories")
        } catch (error) {
            next(error)
        }
    }


    export async function getEditCategory(req, res, next) {
        try {
            const id = req.params.id
            const category = await getCategoryById(id)
            if (!category) throw new HttpError("Category not found", 404)
            console.log(category);
            
            res.render("categories/edit", {category})
        } catch (error) {
            next(error)
        }
    }

    export async function postUpdateCategory(req, res, next) {
        try {
            const id = req.params.id
            const {name , description } = req.body
            const updatedCategory = await updateCategory(id, name, description)
            console.log(updatedCategory);
            res.redirect("/categories")
        } catch (error) {
            next(error)
        }
    }