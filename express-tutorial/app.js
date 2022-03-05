const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const errorController = require('./controllers/error')
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')

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

// relation between product and user
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
})

User.hasMany(Product)

// sync our models to the database by creating the tables
sequelize
    .sync({ force: true })
    .then(res => {
        // console.log(res)
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })
