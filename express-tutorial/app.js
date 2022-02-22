const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// init express
const app = express()

app.use(bodyParser.urlencoded({extended: false}))

// routes
app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found...</h1>')
})

// create server
app.listen(3000)