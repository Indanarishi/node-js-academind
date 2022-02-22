const http = require('http')
const express = require('express')

// init express
const app = express()

// use() allows us to add a new middleware function
app.use('/add-product', (req, res, next) => {
    console.log("In another middleware!")
    res.send('<h1>Add Product Page</h1>')
})

app.use('/', (req, res, next) => {
    console.log("In another middleware!")
    res.send('<h1>Hello from Express</h1>')
})

// create server
app.listen(3000)