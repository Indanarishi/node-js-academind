const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const errorController = require('./controllers/error')
const db = require('./util/database')

// init express
const app = express()

// app set allows us to set any values globally on our express application
app.set('view engine', 'ejs')
app.set('views', 'views')

db.execute('SELECT * FROM products')
    .then((res) => console.log(res[0]))
    .catch((err) => console.log(err))

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

// create server
app.listen(3000)