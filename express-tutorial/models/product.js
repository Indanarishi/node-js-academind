const db = require('../util/database')
const Cart = require('./cart')

module.exports = class Product {
    constructor(id, title, imageUrl, price, desc) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.desc = desc
    }
    
    save() {
        
    }

    static deleteById(id) {
        
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products')
    }

    static findById(id) {
        
    }
}