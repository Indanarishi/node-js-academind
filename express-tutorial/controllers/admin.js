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

    const product = new Product(title, price, desc, imageUrl)
        product
        .save()
        .then(result => {
            console.log('Product Created')
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

// exports.getEditProduct = (req, res, next) => {
//     const editMode = req.query.edit
//     const prodId = req.params.productId
//     if (!editMode) {
//         return res.redirect('/')
//     }
//     req.user
//         .getProducts({
//             where: {
//                 id: prodId
//             }
//         })
//         .then(products => {
//             const product = products[0]
//             if (!product) {
//                 return res.redirect('/')
//             }
//             res.render('admin/edit-product', {
//                 docTitle: 'Edit Product',
//                 path: '/admin/edit-product',
//                 editing: editMode,
//                 product: product
//             })
//         })
//         .catch(err => console.log(err))
// }

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId
    const updatedTitle = req.body.title
    const updatedPrice = req.body.price
    const updatedImageUrl = req.body.imageUrl
    const updatedDesc = req.body.desc
    
    Product.findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.desc = updatedDesc;
            product.imageUrl = updatedImageUrl;
            return product.save()
        })
        .then(result => {
            console.log('Updated Product')
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))

}

exports.getProducts = (req, res, next) => {
    req.user
        .getProducts()
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
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy()
        })
        .then(result => {
            console.log('Product Destroyed')
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}