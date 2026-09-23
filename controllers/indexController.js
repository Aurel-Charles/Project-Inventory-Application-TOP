
export function getIndex(req , res , next) {
    res.render("index" , { title : "Coffee Inventory"})
    next()
}