exports.get404 = (req, res, next) => {
    res.render('404', {docTitle: '404 | Page Not Found', path: '/404'})
}