const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete', 'indana', 'Indana123@', {
    dialect: 'mysql', 
    host: 'localhost' 
})

module.exports = sequelize