const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const errorController = require('./controllers/error')
const sequelize = require('./util/database')

// init express
const app = express()

// app set allows us to set any values globally on our express application
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

// sync our models to the database by creating the tables
sequelize.sync()
    .then(res => {
        // console.log(res)
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })
