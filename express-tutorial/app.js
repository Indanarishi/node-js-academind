const express = require('express')
const bodyParser = require('body-parser')
const expressHbs = require('express-handlebars')
const path = require('path')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// init express
const app = express()

// handlebars
app.engine('hbs', expressHbs())
// app set allows us to set any values globally on our express application
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.render('404', {docTitle: '404 | Page Not Found'})
})

// create server
app.listen(3000)