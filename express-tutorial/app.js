const http = require('http')
const express = require('express')

// init express
const app = express()

// use() allows us to add a new middleware function
app.use((req, res, next) => {
    console.log("In the middleware!")
    // next allows us to go to the next/another middleware
    next()
})

app.use((req, res, next) => {
    console.log("In another middleware!")
    res.send('<h1>Hello from Express</h1>')
})

// create server
const server = http.createServer(app)

server.listen(3000)