const getDb = require('../util/database').getDb

class Product {
    constructor(title, price, desc, imageUrl) {
        this.title = title
        this.price = price
        this.desc = desc
        this.imageUrl = imageUrl
    }

    save() {
        const db = getDb()
        return db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err))
    }
}

module.exports = Product