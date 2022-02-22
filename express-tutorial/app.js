const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// init express
const app = express()

app.use(bodyParser.urlencoded({extended: false}))

// routes
app.use(adminRoutes)
app.use(shopRoutes)

// create server
app.listen(3000)