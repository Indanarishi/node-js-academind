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
        return db.execute(
            "INSERT INTO products (title, price, `desc`, imageUrl) VALUES (?, ?, ?, ?)", 
            [this.title, this.price, this.desc, this.imageUrl]
        )
    }

    static deleteById(id) {
        
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products')
    }

    static findById(id) {
        
    }
}