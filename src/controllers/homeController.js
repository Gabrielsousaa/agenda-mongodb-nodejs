const Contato = require('../models/ContatoModel')

exports.index = async function(req, res) {
    try {
        const contatos = await Contato.FindByContact();
        res.render('index', { contatos })

    } catch (error) {
        console.log(error);

    }
}