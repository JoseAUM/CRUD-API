const express = require("express")

// create express app
const app = express()

// datebase
const mongoose = require("mongoose")

// configure dotenv
require("dotenv").config()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())

// connect to database
mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log("Successfully connect to the database")
}).catch(err => {
    console.log("Couldn't connect to the database", err)
    process.exit()
})

//define routes
const routes = require("./routes/product.routes.js")
app.use(routes)

//listening to requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})