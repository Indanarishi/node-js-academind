const mongodb = require('mongodb')
const MongoCLient = mongodb.MongoClient

const mongoConnect = (callback) => {
    MongoCLient
        .connect('mongodb+srv://indana:<indana>@cluster0.vx92r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        .then(result => {
            console.log('connected')
            callback(result)
        })
        .catch(err => console.log(err))
}

module.exports = mongoConnect