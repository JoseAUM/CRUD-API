const Product = require("../models/product.model.js")

// retrieve all products from database
exports.findAll = (req, res) => {
    Product.find()
        .then(products => {
            res.send(products)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error has ocurred while retrieving the products"
            })
        })
}

// reatrive one product by id
exports.findOne = (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id
                })
            }
            res.send(product)
        }).catch(err => {
            return res.status(500).send({
                message: "an error has ocurred while retriving the product with id " + req.params.id
            })
        })
}

// create and Save a Product
exports.create = (req, res) => {

    // validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Product name can't be empty"
        })
    }

    // create product
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        status: req.body.status
    })

    // save product in database
    product.save()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error has ocurred while creating the product"
            })
        })
}

// create and save multiple products
exports.createMultiple = (req, res) => {
    Product.insertMany(req.body)
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error has ocurred while creating the products"
            })
        })
}

// update a product
exports.updateOne = (req, res) => {

    // validate the request
    if (!req.body.name) {
        return res.send(400).send({
            message: "Product name can't be empty"
        })
    }

    Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        status: req.body.status,
    }, { new: true })
        .then(product => {
            if (!product) {
                return res.stats(404).send({
                    message: "Product not found with id " + req.params.id
                })
            }
            res.send(product)
        }).catch(err => {
            return res.status(500).send({
                message: "An error has ocurred while updating the product with id " + req.params.id
            })
        })
}

exports.delete = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id
                })
            }
            res.send({ message: "Product deleted successfully!" })
        }).catch(err => {
            return res.status(500).send({
                message: "An error has ocurred while deleting the product with id " + req.params.id
            })
        })
}
