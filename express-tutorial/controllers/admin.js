const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: 'Add Product', 
        path: '/admin/add-product',
        editing: false
    })
}

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, desc } = req.body

    Product.create({
        title,
        price,
        imageUrl,
        desc
    })
    .then(res => {
        console.log('Product Created')
    })
    .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    const prodId = req.params.productId
    if (!editMode) {
        return res.redirect('/')
    }
    Product.findById(prodId, (product) => {
        if (!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            docTitle: 'Edit Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product
        })
    })
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId
    const updatedTitle = req.body.title
    const updatedPrice = req.body.price
    const updatedImageUrl = req.body.imageUrl
    const updatedDesc = req.body.desc
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDesc)
    updatedProduct.save()
    res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                prods: products, 
                docTitle: 'Admin Products', 
                path: '/admin/products'
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.deleteById(prodId)
    res.redirect('/admin/products')
}