const http = require('http')
const express = require('express')

// init express
const app = express()

// create server
const server = http.createServer(app)

server.listen(3000)