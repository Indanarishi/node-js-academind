const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const errorController = require('./controllers/error')
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')

// init express
const app = express()

// app set allows us to set any values globally on our express application
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// middleware registered
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))
})

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
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

// sync our models to the database by creating the tables
sequelize
    .sync()
    .then(res => {
        return User.findByPk(1)
        // console.log(res)
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Indana', email: 'indana@test.com' })
        }
        return user
    })
    .then(user => {
        // console.log(user)
        return user.createCart()
    })
    .then(cart => {
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })
