const http = require('http')
const express = require('express')

// init express
const app = express()

// use() allows us to add a new middleware function
app.use((req, res, next) => {
    console.log("In the middleware!")
    // next to go to another middleware
    next()
})

app.use((req, res, next) => {
    console.log("In another middleware!")

})

// create server
const server = http.createServer(app)

server.listen(3000)