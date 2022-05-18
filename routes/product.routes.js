const express = require("express")
const router = express.Router()
const products = require("../controllers/product.controller.js")

// simple route
router.get("/", (req, res) => {
    res.json({ "message": "Welcome to the products CRUD-API application. Made by Jose Ulloa" })
})

// retrive all products
router.get("/products", products.findAll)

// retrieve one product
router.get("/products/:id", products.findOne)

// create a new product
router.post("/products", products.create)

// create multiple products
router.post("/manyProducts", products.createMultiple)

// update a product
router.put("/products/:id", products.updateOne)

// delete a product
router.delete("/products/:id", products.delete)

module.exports = router