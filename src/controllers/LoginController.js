const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if (req.session.user) return res.render('logado');
    res.render('login');
};

exports.register = async function(req, res) {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('index');
            });
            return;
        }
        req.flash('success', 'Usuario registrado');
        req.session.save(function() {
            res.send(login.user);
        });
        return res.redirect('index');

    } catch (error) {
        console.log(error);
        return res.render('404');

    }

};

exports.login = async function(req, res) {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('index');
            });
            return;
        }
        req.flash('success', 'Logado no sistema');
        req.session.user = login.user;
        req.session.save(function() {
            res.send(login.user);
        });
        return res.redirect('index');

    } catch (error) {
        console.log(error);
        return res.render('404');

    }



};

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
};