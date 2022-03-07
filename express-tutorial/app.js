const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const adminRoutes = require('./routes/admin')
// const shopRoutes = require('./routes/shop')

const errorController = require('./controllers/error')
const mongoConnect = require('./util/database').mongoConnect

// init express
const app = express()

// app set allows us to set any values globally on our express application
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// middleware registered
app.use((req, res, next) => {
    // User.findByPk(1)
    //     .then(user => {
    //         req.user = user
    //         next()
    //     })
    //     .catch(err => console.log(err))
    next()
})

// routes
app.use('/admin', adminRoutes)
// app.use(shopRoutes)

app.use(errorController.get404)

mongoConnect(() => {
    app.listen(3000)
})
