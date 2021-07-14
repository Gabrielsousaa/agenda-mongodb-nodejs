const HomeModel = require('../models/HomeModel')

HomeModel.find({})
    .then(dados => console.log(dados))
    .catch(e => console.log(e));
exports.index = (req, res) => {
    res.render('index')

};